import { SimpleFieldValue } from './schema';

export type FormatterCallback = (value: SimpleFieldValue) => SimpleFieldValue;

export interface IFormatter {
  input: FormatterCallback;
  output: FormatterCallback;
}

export type Formatters = { [key in SimpleFieldType]?: IFormatter };
