import { IInternalField } from '../internal-schema';
import { FieldValue } from '../models/schema';

export type ValidatorFunc = (
  field: IInternalField,
  value: FieldValue,
) => boolean;

export interface IValidator {
  validate: (field: IInternalField, value: FieldValue) => boolean;
}
