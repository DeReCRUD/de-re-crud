import {
  FieldChangeNotificationType,
  IFieldChangeNotificationParams,
  IFieldParentChangeNotificationParams
} from '../../form/form.props';
import {
  ComplexFieldValue,
  IField,
  ILinkedStructField,
  SimpleFieldValue
} from '../../models/schema';
import { IStore, IStoreState } from '../../store';
import createFieldParent from '../../utils/create-field-parent';
import formPathToValue from '../../utils/form-path-to-value';
import generateChildErrors from '../../utils/generate-child-errors';
import {
  validateField,
  validateLinkedStructField
} from '../../utils/validation-helper';

export type ChangeArrayActionType = 'add' | 'remove';

const PENDING_FIELD_CHANGE_REQUESTS = {};
const DEBOUNCED_FIELD_CHANGE_REQUESTS: {} = {};

const generateId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

function onFieldChange(
  store: IStore,
  type: FieldChangeNotificationType,
  params: IFieldChangeNotificationParams
) {
  clearTimeout(DEBOUNCED_FIELD_CHANGE_REQUESTS[params.path]);
  delete DEBOUNCED_FIELD_CHANGE_REQUESTS[params.path];
  delete PENDING_FIELD_CHANGE_REQUESTS[params.path];

  const { getState } = store;
  const state = getState();

  const id = generateId();

  if (state.onFieldChange.length > 1) {
    const { onFieldChangeInputTimeout } = state;
    let timeoutId;

    if (onFieldChangeInputTimeout && type === 'input') {
      timeoutId = setTimeout(
        () => onFieldChangeAsync(id, store, params),
        onFieldChangeInputTimeout
      );
    } else {
      timeoutId = setTimeout(() => {
        onFieldChangeAsync(id, store, params);
      }, 0);
    }

    DEBOUNCED_FIELD_CHANGE_REQUESTS[params.path] = timeoutId;

    return;
  }

  state.onFieldChange(params);

  return {};
}

function onFieldChangeAsync(
  id: string,
  { getState, setState }: IStore,
  params: IFieldChangeNotificationParams
) {
  delete DEBOUNCED_FIELD_CHANGE_REQUESTS[params.path];

  const state = getState();

  setState({
    busy: {
      ...state.busy,
      [params.path]: true
    }
  });

  PENDING_FIELD_CHANGE_REQUESTS[params.path] = id;

  state.onFieldChange(params, (externalErrors) => {
    if (PENDING_FIELD_CHANGE_REQUESTS[params.path] !== id) {
      return;
    }

    delete PENDING_FIELD_CHANGE_REQUESTS[params.path];

    const newState = getState();

    setState({
      busy: {
        ...newState.busy,
        [params.path]: false
      },
      externalErrors: {
        ...newState.externalErrors,
        [params.path]: externalErrors
      }
    });
  });
}

export default function fieldHostRendererActions(store: IStore) {
  const { getState, setState } = store;

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
        state.onFieldChange &&
        ((oldValue !== newValue && state.onFieldChangeType === 'blur') ||
          DEBOUNCED_FIELD_CHANGE_REQUESTS[fieldPath])
      ) {
        return onFieldChange(store, 'blur', {
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
      fieldValue: SimpleFieldValue | SimpleFieldValue[]
    ): Partial<IStoreState> | Promise<Partial<IStoreState>> => {
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
        externalErrors: {
          ...state.externalErrors,
          [fieldPath]: []
        },
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
        state.onFieldChange &&
        state.onFieldChangeType === 'input'
      ) {
        const params = {
          formValue: newFormValue,
          newValue: fieldValue,
          oldValue,
          parentValue,
          path: fieldPath
        };

        return onFieldChange(store, 'input', params);
      }

      return {};
    },

    changeArrayValue: (
      state: IStoreState,
      field: ILinkedStructField,
      fieldPath: string,
      type: ChangeArrayActionType,
      startingIndex: number,
      count: number = 1,
      navigateFunc?: (index: number) => void
    ): Partial<IStoreState> | Promise<Partial<IStoreState>> => {
      const oldValue = formPathToValue(state.value, fieldPath);
      const pathArray = fieldPath.split('.');
      const itemsToCreate = count || 1;

      const newValues = [];
      const newPaths = [];

      if (type === 'add') {
        for (let i = 0; i < itemsToCreate; i++) {
          const newValue = createFieldParent(
            field.reference.block.fields.map((x) => x.field)
          );

          newPaths.push(`${fieldPath}.${startingIndex + i}`);
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

      const errors = validateLinkedStructField(
        field,
        iterationValue as object[]
      );

      const newErrors = {
        ...state.errors,
        [fieldPath]: errors
      };

      setState({
        errors: newErrors,
        externalErrors: {
          ...state.externalErrors,
          [fieldPath]: []
        },
        touched: {
          ...state.touched,
          [fieldPath]: true
        },
        value: newFormValue
      });

      if (state.onFieldParentChange) {
        const params: IFieldParentChangeNotificationParams = {
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

        if (state.onFieldParentChange.length > 1) {
          setState({
            formLocked: true
          });

          return new Promise<Partial<IStoreState>>((resolve) => {
            state.onFieldParentChange(params, (externalErrors) => {
              const newState = getState();

              resolve({
                externalErrors: {
                  ...newState.externalErrors,
                  [fieldPath]: externalErrors
                },
                formLocked: false
              });

              navigateFunc(startingIndex);
            });
          });
        }

        state.onFieldParentChange(params);
        navigateFunc(startingIndex);
      }

      return {};
    }
  };
}
