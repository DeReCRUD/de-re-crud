import { IField, FieldValue } from '../schema';

export type ValidatorFunc = (field: IField, value: FieldValue) => boolean;

export interface IValidator {
  validate: (field: IField, value: FieldValue) => boolean;
}
