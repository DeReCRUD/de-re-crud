import { IFormChangeNotificationParams } from '../../form/form.props';
import {
  ComplexFieldValue,
  IField,
  ILinkedStructField,
  SimpleFieldValue
} from '../../models/schema';
import { IStoreState } from '../../store';
import createFieldParent from '../../utils/create-field-parent';
import formPathToValue from '../../utils/form-path-to-value';
import generateChildErrors from '../../utils/generate-child-errors';
import {
  validateField,
  validateLinkedStructField
} from '../../utils/validation-helper';

export type ChangeArrayActionType = 'add' | 'remove';

function onChange(state: IStoreState, params: IFormChangeNotificationParams) {
  state.onChange(params);

  return {};
}

export default function fieldHostRendererActions({ setState }) {
  return {
    focusField: (
      state: IStoreState,
      _: IField,
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
      fieldPath: string,
      parentPath?: string
    ): Partial<IStoreState> => {
      const struct = state.structs.find((x) => x.name === field.struct);
      const oldValue = state.focused[fieldPath];
      const newValue = formPathToValue(state.value, fieldPath);
      const parentValue = formPathToValue(state.value, parentPath);
      const initialValue = formPathToValue(state.initialValue, fieldPath);

      const errors = validateField(
        struct,
        field,
        newValue,
        initialValue,
        state.value,
        parentValue,
        state.collectionReferences
      );

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
        oldValue !== newValue &&
        state.onChange &&
        state.onChangeType === 'blur'
      ) {
        return onChange(state, {
          formValue: state.value,
          newValue,
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
      fieldValue: SimpleFieldValue
    ): Partial<IStoreState> => {
      const struct = state.structs.find((x) => x.name === field.struct);
      const oldValue = formPathToValue(state.value, fieldPath);
      const initialValue = formPathToValue(state.initialValue, fieldPath);
      const pathArray = fieldPath.split('.');

      const newFormValue = { ...state.value };
      let iterationValue = newFormValue;
      let parentValue;

      for (let i = 0; i < pathArray.length; i++) {
        parentValue = iterationValue;
        const path = pathArray[i];

        iterationValue = iterationValue[path];

        if (i === pathArray.length - 1) {
          parentValue[path] = fieldValue;
        } else if (Array.isArray(iterationValue)) {
          parentValue[path] = iterationValue.concat();
        } else if (typeof iterationValue === 'object') {
          parentValue[path] = { ...iterationValue };
        }

        iterationValue = parentValue[path];
      }

      const updates: Partial<IStoreState> = {
        value: newFormValue
      };

      if (state.touched[fieldPath]) {
        const errors = validateField(
          struct,
          field,
          fieldValue,
          initialValue,
          newFormValue,
          parentValue,
          state.collectionReferences
        );

        const newErrors = {
          ...state.errors,
          [fieldPath]: errors
        };

        updates.errors = newErrors;
        updates.childErrors = generateChildErrors(newErrors);
      }

      setState(updates);

      if (
        oldValue !== fieldValue &&
        state.onChange &&
        state.onChangeType === 'change'
      ) {
        return onChange(state, {
          formValue: newFormValue,
          newValue: fieldValue,
          oldValue,
          parentValue,
          path: fieldPath
        });
      }

      return {};
    },

    changeArrayValue: (
      state: IStoreState,
      field: ILinkedStructField,
      fieldPath: string,
      type: ChangeArrayActionType,
      startingIndex: number,
      count: number = 1
    ): Partial<IStoreState> => {
      const oldValue = formPathToValue(state.value, fieldPath);
      const pathArray = fieldPath.split('.');
      const itemsToCreate = count || 1;

      const newValues = [];

      if (type === 'add') {
        for (let i = 0; i < itemsToCreate; i++) {
          const newValue = createFieldParent(
            field.reference.block.fields.map((x) => x.field)
          );

          newValues.push(newValue);
        }
      }

      const newFormValue = { ...state.value };
      let iterationValue: ComplexFieldValue = newFormValue;
      let parentValue;

      for (let i = 0; i < pathArray.length; i++) {
        parentValue = iterationValue;
        const path = pathArray[i];

        iterationValue = iterationValue[path];

        if (i === pathArray.length - 1) {
          if (typeof iterationValue === 'undefined') {
            parentValue[path] = [];
          } else {
            parentValue[path] = (parentValue[path] as object[]).concat();
          }

          const arrayValue = parentValue[path];
          
          switch (type) {
            case 'add':
              arrayValue.push(...newValues);
              break;
            case 'remove':
              arrayValue.splice(startingIndex, 1);
              break;
          }
        } else if (Array.isArray(iterationValue)) {
          parentValue[path] = iterationValue.concat();
        } else if (typeof iterationValue === 'object') {
          parentValue[path] = { ...iterationValue };
        }

        iterationValue = parentValue[path];
      }

      const errors = validateLinkedStructField(field, iterationValue as object[]);

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
        value: newFormValue
      });

      if (state.onChange) {
        const params: IFormChangeNotificationParams = {
          formValue: newFormValue,
          newValue: formPathToValue(newFormValue, fieldPath),
          oldValue,
          parentValue,
          path: fieldPath
        };

        const changedIndicies = [];
        for (let i = startingIndex; i < startingIndex + count; i++) {
          changedIndicies.push(i);
        }

         if (type === 'add') {
          params.addedIndicies = changedIndicies;
        } else if (type === 'remove') {
          params.removedIndicies = changedIndicies;
        }

        return onChange(state, params);
      }

      return {};
    }
  };
}
