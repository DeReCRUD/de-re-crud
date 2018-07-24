import { default as createReduxZeroStore } from 'redux-zero';
import { applyMiddleware } from 'redux-zero/middleware';
import { connect } from 'redux-zero/devtools';
import generateChildErrors from './utils/generate-child-errors';
import {
  FormSubmission,
  FormChangeNotification,
  FormChangeNotificationType,
  CollectionReferences
} from './form/form.props';
import { IStruct } from './models/schema';
import { RendererOptions } from './models/renderer-options';
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
  focused: { [path: string]: any };
  touched: { [path: string]: boolean };
  errors: Errors;
  childErrors: ChildErrors;
  rendererOptions: RendererOptions;
  collectionReferences?: CollectionReferences,
  submitting?: boolean;
  onSubmit?: FormSubmission;
  onChangeType: FormChangeNotificationType;
  onChange?: FormChangeNotification;
};

const logger = store => next => action => {
  if (process.env.ENABLE_LOGGING) {
    console.log('current state:', store.getState());
  }

  return next(action);
};

export function createStore(
  schemaJson: any,
  rendererOptions: RendererOptions,
  struct: string,
  block?: string,
  collectionReferences?: CollectionReferences,
  formState?: {
    errors?: Errors;
    value?: object;
    onSubmit?: FormSubmission;
    onChange?: FormChangeNotification;
    onChangeType?: FormChangeNotificationType;
  }
) {
  const structs = SchemaParser.parse(schemaJson);
  const initialValue = (formState && formState.value) || {};

  const state: StoreState = {
    structs,
    struct,
    block: block || 'default',
    rendererOptions,
    collectionReferences,
    initialValue,
    value: initialValue,
    navStack: [],
    focused: {},
    touched: {},
    errors: formState.errors || {},
    childErrors: generateChildErrors(formState.errors),
    onSubmit: formState && formState.onSubmit,
    onChangeType: (formState && formState.onChangeType) || 'blur',
    onChange: formState && formState.onChange
  };

  const middlewares = [logger, connect ? connect(state) : null].filter(x => x);
  return createReduxZeroStore(state, applyMiddleware(...middlewares));
}
