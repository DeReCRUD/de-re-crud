import Store from 'redux-zero/interfaces/Store';
import { StoreState } from '../../store';

export default function fieldHostRendererActions(store: Store) {
  return {
    onChange: (state: StoreState, fieldPath: string, value: any): Partial<StoreState> => {
      const pathArray = fieldPath.split('.');

      let newValue = { ...state.value };
      let iterationValue = newValue;
      
      for (let i = 0; i < pathArray.length; i++) {
        const parentValue = iterationValue;
        const path = pathArray[i];

        iterationValue = iterationValue[path];

        if (typeof iterationValue === 'undefined' && Array.isArray(parentValue)) {
          parentValue.push({});
        } else if (i === pathArray.length - 1) {
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
    }
  };
}
