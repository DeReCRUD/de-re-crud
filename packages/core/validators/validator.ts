import { FieldValue, IField } from '../models/schema';

export type ValidatorFunc = (field: IField, value: FieldValue) => boolean;

export interface IValidator {
  validate: (field: IField, value: FieldValue) => boolean;
}
