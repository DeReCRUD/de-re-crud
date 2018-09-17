import { IButtonOptions } from '../models/button-options';
import { IErrors } from '../models/errors';
import { IRendererOptions } from '../models/renderer-options';
import { FieldValue, IStruct } from '../models/schema';
import { INavState } from '../store';

export interface ICollectionReferenceParams {
  parentValue: any;
  formValue: any;
}

export type CollectionReference = (
  params: ICollectionReferenceParams
) => object[];

export interface ICollectionReferences {
  [key: string]: CollectionReference;
}

export type FormType = 'create' | 'update';

interface IFormBaseProps {
  className?: string;
  schema: any;
  struct: string;
  block?: string;
  collectionReferences?: ICollectionReferences;
  onCancel?: () => void;
}

export type FormSubmissionCallback = (errors?: IErrors) => void;
export type FormSubmission = (value: any, cb: FormSubmissionCallback) => void;

export interface IFormChangeNotificationParams {
  path: string;
  oldValue?: FieldValue;
  newValue?: FieldValue;
  parentValue: object | object[];
  formValue: object;
}

export type FormChangeNotification = (
  params: IFormChangeNotificationParams
) => void;

export type FormChangeNotificationType = 'blur' | 'change';

export interface IFormConnectProps extends IFormBaseProps {
  type?: FormType;
  rendererOptions?: IRendererOptions;
  buttonOptions?: IButtonOptions;
  errors?: IErrors;
  initialValue?: object;
  onSubmit: FormSubmission;
  onChangeType?: FormChangeNotificationType;
  onChange?: FormChangeNotification;
}

export interface IFormProps extends IFormBaseProps {
  type: FormType;
  rendererOptions: IRendererOptions;
  buttonOptions: IButtonOptions;
  structs: IStruct[];
  submitting: boolean;
  navStack: INavState[];
  submitForm: () => void;
  pop: () => void;
}
