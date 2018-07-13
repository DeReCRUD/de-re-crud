import { default as createReduxZeroStore } from 'redux-zero';
import { applyMiddleware } from 'redux-zero/middleware';
import { connect } from 'redux-zero/devtools';
import generateChildErrors from './utils/generate-child-errors';
import { FormSubmission } from './form/form.props';
import { IStruct } from './models/schema';
import SchemaParser from './schema-parser';

export type Errors = { [path: string]: string[] };

export type ChildErrors = {
  [parentPath: string]: { [childIndex: number]: boolean };
};

export type NavState = {
  path: string;
  struct: string;
  block: string;
};

export type StoreState = {
  structs: IStruct[];
  struct: string;
  block: string;
  initialValue: object;
  value: object;
  navStack: NavState[];
  touched: { [path: string]: boolean };
  errors: Errors;
  childErrors: ChildErrors;
  onSubmit?: FormSubmission;
  submitting?: boolean;
};

const logger = store => next => action => {
  if (process.env.NODE_ENV === 'development') {
    console.log('current state:', store.getState());
  }

  return next(action);
};

export function createStore(
  schemaJson: any,
  struct: string,
  block?: string,
  formState?: {
    errors?: Errors;
    value?: object;
    onSubmit?: FormSubmission
  }
) {
  const structs = SchemaParser.parse(schemaJson);
  const initialValue = (formState && formState.value) || {};

  const state: StoreState = {
    structs,
    struct,
    block: block || 'default',
    initialValue,
    value: initialValue,
    navStack: [],
    touched: {},
    errors: formState.errors || {},
    childErrors: generateChildErrors(formState.errors),
    onSubmit: formState && formState.onSubmit
  };

  const middlewares = [logger, connect ? connect(state) : null].filter(x => x);
  return createReduxZeroStore(state, applyMiddleware(...middlewares));
}
