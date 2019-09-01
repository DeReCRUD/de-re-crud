import {
  ISchema,
  ICollectionReferences,
  IErrors,
  FieldValue,
  IInternalSchema,
} from '@de-re-crud/core';
import { INavState } from '../store';
import { IRendererOptions } from '../options/renderer-options';
import { IRendererDefinitions } from '../renderers/defintions';
import { IButtonOptions } from '../options/button-options';

export type FormType = 'create' | 'update';

interface IFormBaseProps {
  className?: string;
  struct: string;
  block?: string;
  collectionReferences?: ICollectionReferences;
  onCancel?: () => void;
}

export type FormSubmissionCallback = (errors?: IErrors) => void;
export type FormSubmission = (value: any, cb: FormSubmissionCallback) => void;

export interface IFieldChangeNotificationParams {
  path: string;
  oldValue?: FieldValue;
  newValue?: FieldValue;
  parentValue: object | object[];
  formValue: object;
}

export interface IFieldParentChangeNotificationParams {
  path: string;
  addedIndicies?: number[];
  removedIndicies?: number[];
  oldValue: object[];
  newValue: object[];
  parentValue: object;
  formValue: object;
}

export interface IFieldChangeNotificationCallbackParams {
  errors?: string[];
  reEvaluateConditions?: boolean;
}

export type FieldChangeNotificationCallback = (
  params?: IFieldChangeNotificationCallbackParams,
) => void;

export type FieldChangeNotification = (
  params: IFieldChangeNotificationParams,
  cb?: FieldChangeNotificationCallback,
) => void;

export type FieldChangeNotificationType = 'blur' | 'input';

export type FieldParentChangeNotificationCallback = (
  params?: IFieldChangeNotificationCallbackParams,
) => void;

export type FieldParentChangeNotification = (
  params: IFieldParentChangeNotificationParams,
  cb?: FieldParentChangeNotificationCallback,
) => void;

export interface IFormConnectProps extends IFormBaseProps {
  type?: FormType;
  schema: ISchema;
  disabled?: boolean;
  rendererOptions?: IRendererOptions;
  renderers?: Partial<IRendererDefinitions>;
  buttonOptions?: IButtonOptions;
  initialErrors?: IErrors;
  initialValue?: object;
  onSubmit: FormSubmission;
  onFieldChange?: FieldChangeNotification;
  onFieldChangeInputTimeout?: number;
  onFieldChangeType?: FieldChangeNotificationType;
  onFieldParentChange?: FieldParentChangeNotification;
}

export interface IFormProps extends IFormBaseProps {
  type: FormType;
  renderers: IRendererDefinitions;
  buttonOptions: IButtonOptions;
  schema: IInternalSchema;
  formClassName?: string;
  formDisabled: boolean;
  formLocked: boolean;
  formSubmitting: boolean;
  navStack: INavState[];
  submitForm: () => void;
  pop: () => void;
}
