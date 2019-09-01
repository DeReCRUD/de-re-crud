import {
  Logger,
  ISchema,
  generateChildErrors,
  ISchemaJson,
  ScalarFieldValue,
  IErrors,
  IChildErrors,
  ICollectionReferences,
  SchemaParser,
  InternalSchemaHelper,
} from '@de-re-crud/core';
import createReduxZeroStore from 'redux-zero';
import { connect } from 'redux-zero/devtools';
import { applyMiddleware } from 'redux-zero/middleware';
import createFieldParent from './utils/create-field-parent';
import { IRendererDefinitions } from './renderers/defintions';
import { IButtonOptions } from './options/button-options';
import { IRendererOptions } from './options/renderer-options';
import generateCacheKey from './renderers/utils/generate-cache-key';
import parseButtonOptions from './renderers/utils/parse-button-options';
import parseRendererOptions from './renderers/utils/parse-renderer-options';
import { DeReCrudUiOptions } from './options';
import {
  FieldChangeNotification,
  FieldChangeNotificationType,
  FieldParentChangeNotification,
  FormSubmission,
  FormType,
} from './form';

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
  conditionCacheKey: number;
  formId: number;
  formClassName?: string;
  formDisabled: boolean;
  formLocked: boolean;
  formSubmitting: boolean;
  schema: ISchema;
  type: FormType;
  struct: string;
  block: string;
  initialValue: object;
  value: object;
  navStack: INavState[];
  focused: { [path: string]: ScalarFieldValue };
  touched: { [path: string]: boolean };
  busy: { [path: string]: boolean };
  errors: IErrors;
  childErrors: IChildErrors;
  externalErrors: IErrors;
  externalChildErrors: IChildErrors;
  renderers: IRendererDefinitions;
  buttonOptions: IButtonOptions;
  collectionReferences?: ICollectionReferences;
  onSubmit?: FormSubmission;
  onCancel?: () => void;
  onFieldChange?: FieldChangeNotification;
  onFieldChangeInputTimeout?: number;
  onFieldChangeType?: FieldChangeNotificationType;
  onFieldParentChange?: FieldParentChangeNotification;
}

const logger = (store) => (next) => (action) => {
  if (process.env.ENABLE_LOGGING) {
    Logger.debug('current state:', store.getState());
  }

  return next(action);
};

export function createStore(
  schemaJson: ISchemaJson,
  structName: string,
  type?: FormType,
  blockName?: string,
  disabled?: boolean,
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

  const optionDefaults = DeReCrudUiOptions.getDefaults();

  const rendererOptionDefaults =
    rendererOptions || optionDefaults.rendererOptions;

  if (schemaJson && structName) {
    initialValue = createFieldParent(schema, structName, initialValue);
  }

  if (schemaJson && structName && !type) {
    const keyFields = InternalSchemaHelper.getKeyFields(schema, structName);

    const allKeyFieldsSet =
      keyFields.length > 0 &&
      keyFields.every(
        (keyField) => typeof initialValue[keyField] !== 'undefined',
      );

    type = allKeyFieldsSet ? 'update' : 'create';
  }

  const state: IStoreState = {
    conditionCacheKey: generateCacheKey(),
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
    formDisabled: disabled || false,
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
  disabled?: boolean,
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
  const optionDefaults = DeReCrudUiOptions.getDefaults();

  const rendererOptionDefaults =
    rendererOptions || optionDefaults.rendererOptions;

  store.setState({
    formClassName: rendererOptionDefaults
      ? rendererOptionDefaults.formClassName
      : undefined,
    formDisabled: disabled || false,
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
