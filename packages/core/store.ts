import { default as createReduxZeroStore } from 'redux-zero';
import { connect } from 'redux-zero/devtools';
import { applyMiddleware } from 'redux-zero/middleware';
import {
  FieldChangeNotification,
  FieldChangeNotificationType,
  FieldParentChangeNotification,
  FormSubmission,
  FormType,
  ICollectionReferences
} from './form/form.props';
import { IButtonOptions } from './models/button-options';
import { IChildErrors, IErrors } from './models/errors';
import { IRendererOptions } from './models/renderer-options';
import { IStruct, SimpleFieldValue } from './models/schema';
import { DeReCrudOptions } from './options';
import createFieldParent from './utils/create-field-parent';
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
  focused: { [path: string]: SimpleFieldValue };
  touched: { [path: string]: boolean };
  readOnly: { [path: string]: boolean };
  errors: IErrors;
  childErrors: IChildErrors;
  externalErrors: IErrors;
  externalChildErrors: IChildErrors;
  rendererOptions: IRendererOptions;
  buttonOptions: IButtonOptions;
  collectionReferences?: ICollectionReferences;
  submitting?: boolean;
  onSubmit?: FormSubmission;
  onCancel?: () => void;
  onFieldChange?: FieldChangeNotification;
  onFieldChangeType?: FieldChangeNotificationType;
  onFieldParentChange?: FieldParentChangeNotification;
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
  type?: FormType,
  block?: string,
  rendererOptions?: IRendererOptions,
  buttonOptions?: IButtonOptions,
  collectionReferences?: ICollectionReferences,
  formState?: {
    initialErrors?: IErrors;
    initialValue?: object;
    onSubmit?: FormSubmission;
    onCancel?: () => void;
    onFieldChange?: FieldChangeNotification;
    onFieldChangeType?: FieldChangeNotificationType;
    onFieldParentChange?: FieldParentChangeNotification;
  }
): IStore {
  const structs = SchemaParser.parse(schema);

  const optionDefaults = DeReCrudOptions.getDefaults();

  let initialValue;
  let inferredType: FormType;

  if (!type) {
    const structReference = structs.find((x) => x.name === struct);

    if (structReference) {
      initialValue = createFieldParent(
        structReference.fields,
        formState && formState.initialValue
      );

      const keyFields = structReference.fields.filter((x) => x.keyField);

      const allKeyFieldsSet =
        keyFields.length > 0 &&
        keyFields.every(
          (keyField) => typeof initialValue[keyField.name] !== 'undefined'
        );

      inferredType = allKeyFieldsSet ? 'update' : 'create';
    } else {
      initialValue = {};
      inferredType = 'create';
    }
  }

  const state: IStoreState = {
    block: block || 'default',
    buttonOptions: parseButtonOptions(
      buttonOptions,
      optionDefaults.buttonOptions
    ),
    childErrors: {},
    collectionReferences,
    errors: {},
    externalChildErrors: generateChildErrors(formState.initialErrors),
    externalErrors: formState.initialErrors || {},
    focused: {},
    formId: ++FORM_COUNTER,
    initialValue,
    navStack: [],
    onCancel: formState && formState.onCancel,
    onFieldChange: formState && formState.onFieldChange,
    onFieldChangeType: (formState && formState.onFieldChangeType) || 'blur',
    onFieldParentChange: formState && formState.onFieldParentChange,
    onSubmit: formState && formState.onSubmit,
    readOnly: {},
    rendererOptions: rendererOptions || optionDefaults.rendererOptions,
    schema,
    struct,
    structs,
    touched: {},
    type: inferredType,
    value: initialValue
  };

  const middlewares = [logger, connect ? connect(state) : null].filter(
    (x) => x
  );

  return createReduxZeroStore(state, applyMiddleware(...middlewares)) as IStore;
}
