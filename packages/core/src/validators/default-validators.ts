import { IField, FieldValue } from '../schema';
import { ValidatorFunc } from './validator';

export interface IDefaultValidatorFuncs {
  [key: string]: ValidatorFunc;
}

export const defaultValidatorFuncs: IDefaultValidatorFuncs = {
  required: (field: IField, value: FieldValue) => {
    if (field.type === 'linkedStruct' || !field.required) {
      return true;
    }

    return typeof value !== 'undefined' && value !== null && value !== '';
  },
};
