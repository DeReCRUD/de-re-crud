import { default as createReduxZeroStore } from 'redux-zero';
import { IStruct } from './models/schema';
import SchemaParser from './schema-parser';

export type StoreState = {
  structs: IStruct[];
  value: object;
};

export function createStore(schemaJson: any) {
  const store = createReduxZeroStore({
    structs: SchemaParser.parse(schemaJson)
  });

  return store;
}
