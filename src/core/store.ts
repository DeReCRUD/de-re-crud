import { default as createReduxZeroStore } from 'redux-zero';
import { IStruct } from './models/schema';
import SchemaParser from './schema-parser';

export type StoreState = {
  structs: IStruct[];
  initialValue: object;
  value: object;
};

export function createStore(schemaJson: any, value?: object) {
  const structs = SchemaParser.parse(schemaJson);
  const initialValue = value || {};

  const store = createReduxZeroStore({
    structs,
    initialValue,
    value: initialValue
  });

  return store;
}
