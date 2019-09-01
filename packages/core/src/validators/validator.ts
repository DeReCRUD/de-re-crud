import { IInternalField } from '../schema/internal';
import { FieldValue } from '../schema';

export type ValidatorFunc = (
  field: IInternalField,
  value: FieldValue,
) => boolean;

export interface IValidator {
  validate: (field: IInternalField, value: FieldValue) => boolean;
}
