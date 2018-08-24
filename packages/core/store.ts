import { default as createReduxZeroStore } from 'redux-zero';
import { connect } from 'redux-zero/devtools';
import { applyMiddleware } from 'redux-zero/middleware';
import {
  FormChangeNotification,
  FormChangeNotificationType,
  FormSubmission,
  FormType,
  ICollectionReferences
} from './form/form.props';
import { IButtonOptions } from './models/button-options';
import { IChildErrors, IErrors } from './models/errors';
import { IRendererOptions } from './models/renderer-options';
import { IStruct } from './models/schema';
import { DeReCrudOptions } from './options';
import generateChildErrors from './utils/generate-child-errors';
import parseButtonOptions from './utils/parse-button-options';
import SchemaParser from './utils/schema-parser';

let FORM_COUNTER = 0;

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
  formId: number;
  schema: any;
  type: FormType;
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
  buttonOptions: IButtonOptions;
  collectionReferences?: ICollectionReferences;
  submitting?: boolean;
  onSubmit?: FormSubmission;
  onCancel?: () => void;
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
  type: FormType,
  struct: string,
  block?: string,
  rendererOptions?: IRendererOptions,
  buttonOptions?: IButtonOptions,
  collectionReferences?: ICollectionReferences,
  formState?: {
    errors?: IErrors;
    value?: object;
    onSubmit?: FormSubmission;
    onCancel?: () => void;
    onChange?: FormChangeNotification;
    onChangeType?: FormChangeNotificationType;
  }
): IStore {
  const structs = SchemaParser.parse(schema);
  const initialValue = (formState && formState.value) || {};

  const optionDefaults = DeReCrudOptions.getDefaults();

  const state: IStoreState = {
    block: block || 'default',
    buttonOptions: parseButtonOptions(
      buttonOptions,
      optionDefaults.buttonOptions
    ),
    childErrors: generateChildErrors(formState.errors),
    collectionReferences,
    errors: formState.errors || {},
    focused: {},
    formId: ++FORM_COUNTER,
    initialValue,
    navStack: [],
    onCancel: formState && formState.onCancel,
    onChange: formState && formState.onChange,
    onChangeType: (formState && formState.onChangeType) || 'blur',
    onSubmit: formState && formState.onSubmit,
    rendererOptions: rendererOptions || optionDefaults.rendererOptions,
    schema,
    struct,
    structs,
    touched: {},
    type,
    value: initialValue
  };

  const middlewares = [logger, connect ? connect(state) : null].filter(
    (x) => x
  );

  return createReduxZeroStore(state, applyMiddleware(...middlewares)) as IStore;
}
