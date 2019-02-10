import { default as createReduxZeroStore } from 'redux-zero';
import { connect } from 'redux-zero/devtools';
import { applyMiddleware } from 'redux-zero/middleware';
import {
  FieldChangeNotification,
  FieldChangeNotificationType,
  FieldParentChangeNotification,
  FormSubmission,
  FormType,
  ICollectionReferences,
} from './form/form.props';
import { IInternalSchema } from './internal-schema';
import { IButtonOptions } from './models/button-options';
import { IChildErrors, IErrors } from './models/errors';
import { IRendererDefinitions } from './models/renderer-definitions';
import { IRendererOptions } from './models/renderer-options';
import { SimpleFieldValue } from './models/schema';
import { DeReCrudOptions } from './options';
import SchemaParser from './schema-parser';
import createFieldParent from './utils/create-field-parent';
import generateChildErrors from './utils/generate-child-errors';
import parseButtonOptions from './utils/parse-button-options';
import parseRendererOptions from './utils/parse-renderer-options';
import { getKeyFields } from './utils/schema-helper';

let FORM_COUNTER = 0;

export interface IStore {
  middleware(): void;
  setState(state: Partial<IStoreState>): void;
  subscribe(cb: () => any): any;
  getState(): IStoreState;
  reset(): void;
}

export interface INavState {
  path: string;
  struct: string;
  block: string;
}

export interface IStoreState {
  formId: number;
  formClassName?: string;
  schema: IInternalSchema;
  type: FormType;
  struct: string;
  block: string;
  initialValue: object;
  value: object;
  navStack: INavState[];
  focused: { [path: string]: SimpleFieldValue };
  touched: { [path: string]: boolean };
  busy: { [path: string]: boolean };
  errors: IErrors;
  childErrors: IChildErrors;
  externalErrors: IErrors;
  externalChildErrors: IChildErrors;
  renderers: IRendererDefinitions;
  buttonOptions: IButtonOptions;
  collectionReferences?: ICollectionReferences;
  formLocked: boolean;
  formSubmitting: boolean;
  onSubmit?: FormSubmission;
  onCancel?: () => void;
  onFieldChange?: FieldChangeNotification;
  onFieldChangeInputTimeout?: number;
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
  schemaJson: any,
  structName: string,
  type?: FormType,
  blockName?: string,
  rendererOptions?: IRendererOptions,
  renderers?: Partial<IRendererDefinitions>,
  buttonOptions?: IButtonOptions,
  collectionReferences?: ICollectionReferences,
  initialErrors?: IErrors,
  initialValue?: object,
  onSubmit?: FormSubmission,
  onCancel?: () => void,
  onFieldChange?: FieldChangeNotification,
  onFieldChangeInputTimeout?: number,
  onFieldChangeType?: FieldChangeNotificationType,
  onFieldParentChange?: FieldParentChangeNotification,
): IStore {
  const schema = SchemaParser.parse(schemaJson);

  const optionDefaults = DeReCrudOptions.getDefaults();

  const rendererOptionDefaults =
    rendererOptions || optionDefaults.rendererOptions;

  initialValue = createFieldParent(schema, structName, initialValue);

  if (!type) {
    const keyFields = getKeyFields(schema, structName);

    const allKeyFieldsSet =
      keyFields.length > 0 &&
      keyFields.every(
        (keyField) => typeof initialValue[keyField] !== 'undefined',
      );

    type = allKeyFieldsSet ? 'update' : 'create';
  }

  const state: IStoreState = {
    block: blockName || 'default',
    busy: {},
    buttonOptions: parseButtonOptions(
      buttonOptions,
      optionDefaults.buttonOptions,
    ),
    childErrors: {},
    collectionReferences,
    errors: {},
    externalChildErrors: generateChildErrors(initialErrors),
    externalErrors: initialErrors || {},
    focused: {},
    formId: ++FORM_COUNTER,
    formClassName: rendererOptionDefaults
      ? rendererOptionDefaults.formClassName
      : undefined,
    formLocked: false,
    formSubmitting: false,
    initialValue,
    navStack: [],
    onCancel,
    onFieldChange,
    onFieldChangeInputTimeout,
    onFieldChangeType: onFieldChangeType || 'blur',
    onFieldParentChange,
    onSubmit,
    renderers: parseRendererOptions(
      rendererOptions || optionDefaults.rendererOptions,
      renderers,
      optionDefaults.renderers,
    ),
    schema,
    struct: structName,
    touched: {},
    type,
    value: initialValue,
  };

  const middlewares = [logger, connect ? connect(state) : null].filter(
    (x) => x,
  );

  return createReduxZeroStore(state, applyMiddleware(...middlewares)) as IStore;
}

export function updateStore(
  store: IStore,
  rendererOptions?: IRendererOptions,
  renderers?: Partial<IRendererDefinitions>,
  buttonOptions?: IButtonOptions,
  collectionReferences?: ICollectionReferences,
  onSubmit?: FormSubmission,
  onCancel?: () => void,
  onFieldChange?: FieldChangeNotification,
  onFieldChangeInputTimeout?: number,
  onFieldChangeType?: FieldChangeNotificationType,
  onFieldParentChange?: FieldParentChangeNotification,
) {
  const optionDefaults = DeReCrudOptions.getDefaults();

  const rendererOptionDefaults =
    rendererOptions || optionDefaults.rendererOptions;

  store.setState({
    formClassName: rendererOptionDefaults
      ? rendererOptionDefaults.formClassName
      : undefined,
    collectionReferences,
    onCancel,
    onFieldChange,
    onFieldChangeInputTimeout,
    onFieldChangeType: onFieldChangeType || 'blur',
    onFieldParentChange,
    onSubmit,
    renderers: parseRendererOptions(
      rendererOptionDefaults,
      renderers,
      optionDefaults.renderers,
    ),
    buttonOptions: parseButtonOptions(
      buttonOptions,
      optionDefaults.buttonOptions,
    ),
  });
}
