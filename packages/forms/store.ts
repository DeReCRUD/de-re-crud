import { default as createReduxZeroStore } from 'redux-zero';
import { IStruct } from './models/schema';
import SchemaParser from './schema-parser';

export type Errors = { [path: string]: string[] };

export type NavState = {
  path: string;
  struct: string;
  block: string;
};

export type StoreState = {
  structs: IStruct[];
  initialValue: object;
  value: object;
  navStack: NavState[];
  touched: { [path: string]: boolean };
  errors: Errors;
};

export function createStore(schemaJson: any, errors?: Errors, value?: object) {
  const structs = SchemaParser.parse(schemaJson);
  const initialValue = value || {};

  const state: StoreState = {
    structs,
    initialValue,
    value: initialValue,
    navStack: [],
    touched: {},
    errors: errors || {}
  };

  return createReduxZeroStore(state);
}
