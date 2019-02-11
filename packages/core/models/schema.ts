export const DEFAULT_FIELD_WIDTH = 12;
export type StampSize = 1 | 2 | 3 | 4 | 5 | 6;

export interface IConditionParams {
  path: string;
  parentValue: object | object[];
  formValue: object;
}

export type ConditionFunc = (params: IConditionParams) => boolean;
export type FieldConditionFunc = (fieldParent: object, form: object) => boolean;
export type BlockConditionFunc = (form: object) => boolean;

export type SimpleFieldType =
  | 'text'
  | 'keyword'
  | 'integer'
  | 'estimate'
  | 'date'
  | 'boolean'
  | 'percent'
  | 'money';

export type FieldType =
  | SimpleFieldType
  | 'foreignKey'
  | 'linkedStruct'
  | 'list'
  | 'derived'
  | 'stamp';

export interface ICustomHints {
  [key: string]: any;
}

export type SimpleFieldValue = string | number | boolean;
export type ComplexFieldValue = object | object[];

export type FieldValue = SimpleFieldValue | ComplexFieldValue;

export type ListValue = string | number;

export interface IOption {
  label: string;
  value: ListValue;
}

export type ReferenceValue = ListValue | object;

export interface ICustomValidator {
  name: string;
  pattern: RegExp;
  message: string;
  negate: boolean;
}

export interface ILabel {
  short: string;
  medium: string;
  long: string;
}
