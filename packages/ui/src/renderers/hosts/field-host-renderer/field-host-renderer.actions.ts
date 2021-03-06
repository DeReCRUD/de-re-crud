import {
  ScalarFieldValue,
  ObjectFieldValue,
  ILinkedStructField,
  validateField,
  validateLinkedStructField,
  getValueForPath,
  setValueForPath,
  generateChildErrors,
  InternalSchemaHelper,
} from '@de-re-crud/core';
import {
  FieldChangeNotificationType,
  IFieldChangeNotificationParams,
  IFieldParentChangeNotificationParams,
} from '../../../form';
import { IStore, IStoreState } from '../../../store';
import createFieldParent from '../../../utils/create-field-parent';
import generateCacheKey from '../../utils/generate-cache-key';

export type ChangeArrayActionType = 'add' | 'remove';

const PENDING_FIELD_CHANGE_REQUESTS = {};
const DEBOUNCED_FIELD_CHANGE_REQUESTS: {} = {};

const generateId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9);

function onFieldChangeAsync(
  id: string,
  { getState, setState }: IStore,
  params: IFieldChangeNotificationParams,
) {
  delete DEBOUNCED_FIELD_CHANGE_REQUESTS[params.path];

  const state = getState();

  setState({
    busy: {
      ...state.busy,
      [params.path]: true,
    },
  });

  PENDING_FIELD_CHANGE_REQUESTS[params.path] = id;

  state.onFieldChange(params, (callbackParams = {}) => {
    if (PENDING_FIELD_CHANGE_REQUESTS[params.path] !== id) {
      return;
    }

    delete PENDING_FIELD_CHANGE_REQUESTS[params.path];

    const prevState = getState();

    const newState: Partial<IStoreState> = {
      busy: {
        ...prevState.busy,
        [params.path]: false,
      },
      externalErrors: {
        ...prevState.externalErrors,
        [params.path]: callbackParams.errors,
      },
    };

    if (callbackParams.reEvaluateConditions) {
      newState.conditionCacheKey = generateCacheKey();
    }

    setState(newState);
  });
}

function onFieldChange(
  store: IStore,
  type: FieldChangeNotificationType,
  params: IFieldChangeNotificationParams,
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
        onFieldChangeInputTimeout,
      );
    } else {
      timeoutId = setTimeout(() => {
        onFieldChangeAsync(id, store, params);
      }, 0);
    }

    DEBOUNCED_FIELD_CHANGE_REQUESTS[params.path] = timeoutId;
    return {};
  }

  state.onFieldChange(params);

  return {};
}

export default function fieldHostRendererActions(store: IStore) {
  const { getState, setState } = store;

  return {
    focusField: (
      state: IStoreState,
      _: string,
      __: string,
      fieldPath: string,
    ): Partial<IStoreState> => {
      const value = getValueForPath(state.value, fieldPath);

      return {
        focused: {
          ...state.focused,
          [fieldPath]: value,
        },
      };
    },

    blurField: (
      state: IStoreState,
      structName: string,
      fieldName: string,
      fieldPath: string,
      parentPath?: string,
    ): Partial<IStoreState> => {
      const oldValue = state.focused[fieldPath];
      const newValue = getValueForPath(state.value, fieldPath);
      const parentValue = getValueForPath(state.value, parentPath);
      const initialValue = getValueForPath(state.initialValue, fieldPath);

      const errors = validateField(
        state.schema,
        structName,
        fieldName,
        newValue,
        initialValue,
        state.value,
        parentValue,
        state.schema.customValidators,
        state.collectionReferences,
      );

      const focused = { ...state.focused };
      delete focused[fieldPath];

      setState({
        errors: {
          ...state.errors,
          [fieldPath]: errors,
        },
        focused,
        touched: {
          ...state.touched,
          [fieldPath]: true,
        },
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
          path: fieldPath,
        });
      }

      return {};
    },

    changeValue: (
      state: IStoreState,
      structName: string,
      fieldName: string,
      fieldPath: string,
      fieldValue: ScalarFieldValue | ScalarFieldValue[],
    ): Partial<IStoreState> | Promise<Partial<IStoreState>> => {
      const oldValue = getValueForPath(state.value, fieldPath);
      const initialValue = getValueForPath(state.initialValue, fieldPath);
      const pathArray = fieldPath.split('.');

      let parentPath;
      if (pathArray.length > 1) {
        parentPath = pathArray.splice(0, pathArray.length).join('.');
      } else {
        parentPath = fieldPath;
      }

      const newFormValue = setValueForPath(state.value, fieldPath, fieldValue);
      const parentValue = getValueForPath(newFormValue, parentPath);

      const updates: Partial<IStoreState> = {
        externalErrors: {
          ...state.externalErrors,
          [fieldPath]: [],
        },
        value: newFormValue,
      };

      if (state.touched[fieldPath]) {
        const errors = validateField(
          state.schema,
          structName,
          fieldName,
          fieldValue,
          initialValue,
          newFormValue,
          parentValue,
          state.schema.customValidators,
          state.collectionReferences,
        );

        const newErrors = {
          ...state.errors,
          [fieldPath]: errors,
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
          path: fieldPath,
        };

        return onFieldChange(store, 'input', params);
      }

      return {};
    },

    changeArrayValue: (
      state: IStoreState,
      structName: string,
      fieldName: string,
      fieldPath: string,
      type: ChangeArrayActionType,
      startingIndex: number,
      count: number = 1,
      navigateFunc?: (index: number) => void,
      values?: object[],
    ): Partial<IStoreState> | Promise<Partial<IStoreState>> => {
      const linkedStructField = state.schema.fields
        .get(structName)
        .get(fieldName) as ILinkedStructField;

      const deletionFields = InternalSchemaHelper.getDeletionFields(
        state.schema,
        linkedStructField.reference.struct,
      );

      const oldValue = getValueForPath(state.value, fieldPath);
      const pathArray = fieldPath.split('.');
      const itemsToCreate = count || 1;

      const newValues = [];
      const newPaths = [];

      if (type === 'add') {
        for (let i = 0; i < itemsToCreate; i++) {
          let newValue: object;
          if (Array.isArray(values) && typeof values[i] === 'object') {
            newValue = values[i];
          } else {
            newValue = createFieldParent(state.schema, structName);
          }

          newPaths.push(`${fieldPath}.${startingIndex + i}`);
          newValues.push(newValue);
        }
      }

      const newFormValue = { ...state.value };
      let iterationValue: ObjectFieldValue = newFormValue;
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
              if (!deletionFields.length) {
                arrayValue.splice(startingIndex, 1);
              } else {
                arrayValue[startingIndex] = {
                  ...arrayValue[startingIndex],
                  ...deletionFields.reduce((prev, curr) => {
                    const fields = prev;

                    const field = InternalSchemaHelper.getField(
                      state.schema,
                      linkedStructField.reference.struct,
                      curr,
                    );

                    switch (field.type) {
                      case 'date':
                        fields[curr] = new Date().toISOString();
                        break;
                      case 'boolean':
                        fields[curr] = true;
                        break;
                      default:
                        break;
                    }

                    return fields;
                  }, {}),
                };
              }
              break;
            default:
              return {};
          }
        } else if (Array.isArray(iterationValue)) {
          parentValue[path] = iterationValue.concat();
        } else if (typeof iterationValue === 'object') {
          parentValue[path] = { ...iterationValue };
        }

        iterationValue = parentValue[path];
      }

      const errors = validateLinkedStructField(
        state.schema,
        linkedStructField,
        iterationValue as object[],
      );

      const newErrors = {
        ...state.errors,
        [fieldPath]: errors,
      };

      setState({
        errors: newErrors,
        externalErrors: {
          ...state.externalErrors,
          [fieldPath]: [],
        },
        touched: {
          ...state.touched,
          [fieldPath]: true,
        },
        value: newFormValue,
      });

      if (state.onFieldParentChange) {
        const params: IFieldParentChangeNotificationParams = {
          formValue: newFormValue,
          newValue: getValueForPath(newFormValue, fieldPath),
          oldValue,
          parentValue,
          path: fieldPath,
        };

        const changedIndices = [];
        for (let i = startingIndex; i < startingIndex + count; i++) {
          changedIndices.push(i);
        }

        if (type === 'add') {
          params.addedIndicies = changedIndices;
        } else if (type === 'remove') {
          params.removedIndicies = changedIndices;
        }

        if (state.onFieldParentChange.length > 1) {
          setState({
            formLocked: true,
          });

          return new Promise<Partial<IStoreState>>((resolve) => {
            state.onFieldParentChange(params, (callbackParams = {}) => {
              const prevState = getState();

              const newState: Partial<IStoreState> = {
                externalErrors: {
                  ...prevState.externalErrors,
                  [fieldPath]: callbackParams.errors,
                },
                formLocked: false,
              };

              if (callbackParams.value) {
                newState.value = setValueForPath(
                  newState.value,
                  fieldPath,
                  callbackParams.value,
                );
              }

              if (callbackParams.reEvaluateConditions) {
                newState.conditionCacheKey = generateCacheKey();
              }

              resolve(newState);

              if (navigateFunc) {
                navigateFunc(startingIndex);
              }
            });
          });
        }

        state.onFieldParentChange(params);
      }

      if (navigateFunc) {
        navigateFunc(startingIndex);
      }

      return {};
    },
  };
}
