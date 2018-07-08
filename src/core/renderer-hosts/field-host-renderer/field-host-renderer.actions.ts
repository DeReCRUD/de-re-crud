import Store from 'redux-zero/interfaces/Store';
import { StoreState } from '../../store';

export type ChangeArrayActionType = 'add' | 'remove';

export default function fieldHostRendererActions(store: Store) {
  return {
    onChange: (
      state: StoreState,
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

      return {
        value: newValue
      };
    },

    onChangeArray: (
      state: StoreState,
      fieldPath: string,
      type: ChangeArrayActionType
    ): Partial<StoreState> => {
      const pathArray = fieldPath.split('.');

      let newValue = { ...state.value };
      let iterationValue: any = newValue;

      for (let i = 0; i < pathArray.length; i++) {
        const parentValue = iterationValue;
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

      return {
        value: newValue
      };
    }
  };
}
