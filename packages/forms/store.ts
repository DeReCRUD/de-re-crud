import { default as createReduxZeroStore } from 'redux-zero';
import { IStruct } from './models/schema';
import SchemaParser from './schema-parser';

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
  errors: { [path: string]: string[] };
};

export function createStore(schemaJson: any, value?: object) {
  const structs = SchemaParser.parse(schemaJson);
  const initialValue = value || {};

  const state: StoreState = {
    structs,
    initialValue,
    value: initialValue,
    navStack: [],
    touched: {},
    errors: {}
  };

  return createReduxZeroStore(state);
}
