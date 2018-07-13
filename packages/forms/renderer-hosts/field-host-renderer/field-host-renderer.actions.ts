import { IField } from '@de-re-crud/forms/models/schema';
import { validateField } from '@de-re-crud/forms/utils/validation-helper';
import { StoreState } from '../../store';
import formPathToValue from '@de-re-crud/forms/utils/form-path-to-value';

export type ChangeArrayActionType = 'add' | 'remove';

export default function fieldHostRendererActions() {
  return {
    touchField: (
      state: StoreState,
      field: IField,
      fieldPath: string
    ): Partial<StoreState> => {
      const value = formPathToValue(state.value, fieldPath);
      const errors = validateField(field, value);

      return {
        errors: {
          ...state.errors,
          [fieldPath]: errors
        },
        touched: {
          ...state.touched,
          [fieldPath]: true
        }
      };
    },

    changeValue: (
      state: StoreState,
      field: IField,
      fieldPath: string,
      value: any
    ): Partial<StoreState> => {
      const pathArray = fieldPath.split('.');

      let newValue = { ...state.value };
      let iterationValue = newValue;

      for (let i = 0; i < pathArray.length; i++) {
        const parentValue = iterationValue;
        const path = pathArray[i];

        iterationValue = iterationValue[path];

        if (i === pathArray.length - 1) {
          parentValue[path] = value;
        } else if (Array.isArray(iterationValue)) {
          parentValue[path] = iterationValue.concat();
        } else if (typeof iterationValue === 'object') {
          parentValue[path] = { ...iterationValue };
        }

        iterationValue = parentValue[path];
      }

      const updates: Partial<StoreState> = {
        value: newValue
      };

      if (state.touched[fieldPath]) {
        const errors = validateField(field, value);

        updates.errors = {
          ...state.errors,
          [fieldPath]: errors
        };
      }

      return updates;
    },

    changeArrayValue: (
      state: StoreState,
      field: IField,
      fieldPath: string,
      itemPath: string,
      type: ChangeArrayActionType
    ): Partial<StoreState> => {
      const pathArray = itemPath.split('.');

      let newValue = { ...state.value };
      let iterationValue: any = newValue;
      let parentValue;

      for (let i = 0; i < pathArray.length; i++) {
        parentValue = iterationValue;
        const path = pathArray[i];

        iterationValue = iterationValue[path];
        if (i === pathArray.length - 1) {
          switch (type) {
            case 'add':
              parentValue.push({});
              break;
            case 'remove':
              parentValue.splice(path, 1);
              break;
          }
        } else if (Array.isArray(iterationValue)) {
          parentValue[path] = iterationValue.concat();
        } else if (typeof iterationValue === 'object') {
          parentValue[path] = { ...iterationValue };
        } else if (
          typeof iterationValue === 'undefined' &&
          i === pathArray.length - 2
        ) {
          parentValue[path] = [];
        }

        iterationValue = parentValue[path];
      }

      const errors = {
        [fieldPath]: validateField(field, parentValue)
      };

      return {
        value: newValue,
        touched: {
          ...state.touched,
          [fieldPath]: true
        },
        errors: {
          ...state.errors,
          ...errors
        }
      };
    }
  };
}
