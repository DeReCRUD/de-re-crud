import { validateField } from "../../utils/validation-helper";
import formPathToValue from "../../utils/form-path-to-value";
import generateChildErrors from "../../utils/generate-child-errors";
import { IField } from "../../models/schema";
import { StoreState } from "../../store";

export type ChangeArrayActionType = "add" | "remove";

export default function fieldHostRendererActions({ setState }) {
  return {
    focusField: (
      state: StoreState,
      field: IField,
      fieldPath: string
    ): Partial<StoreState> => {
      const value = formPathToValue(state.value, fieldPath);

      return {
        focused: {
          ...state.focused,
          [fieldPath]: value
        },
        touched: {
          ...state.touched,
          [fieldPath]: true
        }
      };
    },

    blurField: (
      state: StoreState,
      field: IField,
      fieldPath: string
    ): Partial<StoreState> => {
      const oldValue = state.focused[fieldPath];
      const value = formPathToValue(state.value, fieldPath);
      const parentValue = formPathToValue(
        state.value,
        fieldPath.substring(0, fieldPath.lastIndexOf("."))
      );
      const errors = validateField(field, value);

      const focused = { ...state.focused };
      delete focused[fieldPath];

      setState({
        errors: {
          ...state.errors,
          [fieldPath]: errors
        },
        focused,
        touched: {
          ...state.touched,
          [fieldPath]: true
        }
      });

      if (
        oldValue !== value &&
        state.onChange &&
        state.onChangeType === "blur"
      ) {
        state.onChange({
          path: fieldPath,
          oldValue,
          newValue: value,
          parentValue: parentValue || state.value,
          formValue: state.value
        });
      }

      return {};
    },

    changeValue: (
      state: StoreState,
      field: IField,
      fieldPath: string,
      value: any
    ): Partial<StoreState> => {
      const oldValue = formPathToValue(state.value, fieldPath);
      const pathArray = fieldPath.split(".");

      let newValue = { ...state.value };
      let iterationValue = newValue;
      let parentValue;

      for (let i = 0; i < pathArray.length; i++) {
        parentValue = iterationValue;
        const path = pathArray[i];

        iterationValue = iterationValue[path];

        if (i === pathArray.length - 1) {
          parentValue[path] = value;
        } else if (Array.isArray(iterationValue)) {
          parentValue[path] = iterationValue.concat();
        } else if (typeof iterationValue === "object") {
          parentValue[path] = { ...iterationValue };
        }

        iterationValue = parentValue[path];
      }

      const updates: Partial<StoreState> = {
        value: newValue
      };

      if (state.touched[fieldPath]) {
        const errors = validateField(field, value);

        const newErrors = {
          ...state.errors,
          [fieldPath]: errors
        };

        updates.errors = newErrors;
        updates.childErrors = generateChildErrors(newErrors);
      }

      setState(updates);

      if (
        oldValue !== value &&
        state.onChange &&
        state.onChangeType === "change"
      ) {
        state.onChange({
          path: fieldPath,
          oldValue,
          newValue: value,
          parentValue,
          formValue: newValue
        });
      }

      return {};
    },

    changeArrayValue: (
      state: StoreState,
      field: IField,
      fieldPath: string,
      itemPath: string,
      type: ChangeArrayActionType
    ): Partial<StoreState> => {
      const pathArray = itemPath.split(".");

      let newValue = { ...state.value };
      let iterationValue: any = newValue;
      let parentValue;

      for (let i = 0; i < pathArray.length; i++) {
        parentValue = iterationValue;
        const path = pathArray[i];

        iterationValue = iterationValue[path];
        if (i === pathArray.length - 1) {
          switch (type) {
            case "add":
              parentValue.push({});
              break;
            case "remove":
              parentValue.splice(path, 1);
              break;
          }
        } else if (Array.isArray(iterationValue)) {
          parentValue[path] = iterationValue.concat();
        } else if (typeof iterationValue === "object") {
          parentValue[path] = { ...iterationValue };
        } else if (
          typeof iterationValue === "undefined" &&
          i === pathArray.length - 2
        ) {
          parentValue[path] = [];
        }

        iterationValue = parentValue[path];
      }

      const errors = validateField(field, parentValue);

      const newErrors = {
        ...state.errors,
        [fieldPath]: errors
      };

      setState({
        value: newValue,
        touched: {
          ...state.touched,
          [fieldPath]: true
        },
        errors: newErrors,
        childErrors: generateChildErrors(newErrors)
      });

      if (state.onChange) {
        state.onChange({
          path: itemPath,
          oldValue: type === "remove" ? state.value : undefined,
          newValue: type === "add" ? {} : undefined,
          parentValue,
          formValue: newValue
        });
      }

      return {};
    }
  };
}
