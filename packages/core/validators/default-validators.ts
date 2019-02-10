import { IInternalField } from '../internal-schema';
import { FieldValue } from '../models/schema';
import { ValidatorFunc } from './validator';

export interface IDefaultValidatorFuncs {
  [key: string]: ValidatorFunc;
}

export const defaultValidators = ['required'];

export const defaultValidatorMessages = {
  required: 'This field is required.',
};

export const defaultValidatorFuncs: IDefaultValidatorFuncs = {
  required: (field: IInternalField, value: FieldValue) => {
    if (field.type === 'linkedStruct' || !field.required) {
      return true;
    }

    return typeof value !== 'undefined' && value !== null && value !== '';
  },
};
