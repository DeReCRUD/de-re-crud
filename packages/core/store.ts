import { default as createReduxZeroStore } from 'redux-zero';
import { connect } from 'redux-zero/devtools';
import { applyMiddleware } from 'redux-zero/middleware';
import {
  FormChangeNotification,
  FormChangeNotificationType,
  FormSubmission,
  ICollectionReferences
} from './form/form.props';
import { IChildErrors, IErrors } from './models/errors';
import { IRendererOptions } from './models/renderer-options';
import { IStruct } from './models/schema';
import { DeReCrudOptions } from './options';
import SchemaParser from './schema-parser';
import generateChildErrors from './utils/generate-child-errors';

export interface IStore {
  middleware(): void;
  setState(state: any): void;
  subscribe(cb: () => any): any;
  getState(): object;
  reset(): void;
}

export interface INavState {
  path: string;
  struct: string;
  block: string;
}

export interface IStoreState {
  schema: any;
  structs: IStruct[];
  struct: string;
  block: string;
  initialValue: object;
  value: object;
  navStack: INavState[];
  focused: { [path: string]: any };
  touched: { [path: string]: boolean };
  errors: IErrors;
  childErrors: IChildErrors;
  rendererOptions: IRendererOptions;
  collectionReferences?: ICollectionReferences;
  submitting?: boolean;
  onSubmit?: FormSubmission;
  onChangeType: FormChangeNotificationType;
  onChange?: FormChangeNotification;
}

const logger = (store) => (next) => (action) => {
  if (process.env.ENABLE_LOGGING) {
    // tslint:disable-next-line:no-console
    console.log('current state:', store.getState());
  }

  return next(action);
};

export function createStore(
  schema: any,
  struct: string,
  block?: string,
  rendererOptions?: IRendererOptions,
  collectionReferences?: ICollectionReferences,
  formState?: {
    errors?: IErrors;
    value?: object;
    onSubmit?: FormSubmission;
    onChange?: FormChangeNotification;
    onChangeType?: FormChangeNotificationType;
  }
): IStore {
  const structs = SchemaParser.parse(schema);
  const initialValue = (formState && formState.value) || {};

  const state: IStoreState = {
    block: block || 'default',
    childErrors: generateChildErrors(formState.errors),
    collectionReferences,
    errors: formState.errors || {},
    focused: {},
    initialValue,
    navStack: [],
    onChange: formState && formState.onChange,
    onChangeType: (formState && formState.onChangeType) || 'blur',
    onSubmit: formState && formState.onSubmit,
    rendererOptions:
      rendererOptions || DeReCrudOptions.getDefaults().rendererOptions,
    schema,
    struct,
    structs,
    touched: {},
    value: initialValue
  };

  const middlewares = [logger, connect ? connect(state) : null].filter(
    (x) => x
  );

  return createReduxZeroStore(state, applyMiddleware(...middlewares)) as IStore;
}
