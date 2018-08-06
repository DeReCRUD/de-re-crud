import { IField } from "../../models/schema";
import { IStoreState } from "../../store";
import formPathToValue from "../../utils/form-path-to-value";
import generateChildErrors from "../../utils/generate-child-errors";
import { validateField } from "../../utils/validation-helper";

export type ChangeArrayActionType = "add" | "remove";

export default function fieldHostRendererActions({ setState }) {
  return {
    focusField: (
      state: IStoreState,
      fieldPath: string
    ): Partial<IStoreState> => {
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
      state: IStoreState,
      field: IField,
      fieldPath: string
    ): Partial<IStoreState> => {
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
          formValue: state.value,
          newValue: value,
          oldValue,
          parentValue: parentValue || state.value,
          path: fieldPath
        });
      }

      return {};
    },

    changeValue: (
      state: IStoreState,
      field: IField,
      fieldPath: string,
      value: any
    ): Partial<IStoreState> => {
      const oldValue = formPathToValue(state.value, fieldPath);
      const pathArray = fieldPath.split(".");

      const newValue = { ...state.value };
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

      const updates: Partial<IStoreState> = {
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
          formValue: newValue,
          newValue: value,
          oldValue,
          parentValue,
          path: fieldPath
        });
      }

      return {};
    },

    changeArrayValue: (
      state: IStoreState,
      field: IField,
      fieldPath: string,
      itemPath: string,
      type: ChangeArrayActionType
    ): Partial<IStoreState> => {
      const pathArray = itemPath.split(".");

      const newValue = { ...state.value };
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
        childErrors: generateChildErrors(newErrors),
        errors: newErrors,
        touched: {
          ...state.touched,
          [fieldPath]: true
        },
        value: newValue
      });

      if (state.onChange) {
        state.onChange({
          formValue: newValue,
          newValue: type === "add" ? {} : undefined,
          oldValue: type === "remove" ? state.value : undefined,
          parentValue,
          path: itemPath
        });
      }

      return {};
    }
  };
}
