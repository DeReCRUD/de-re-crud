import { IStruct, IOption } from '../models/schema';
import { RendererOptions } from '../models/renderer-options';
import { NavState, Errors } from '../store';

export type CollectionReference = (formValue: any) => IOption[];
export type CollectionReferences = { [key: string]: CollectionReference };

type FormBaseProps = {
  className?: string;
  schema: any;
  struct: string;
  block?: string;
  collectionReferences?: CollectionReferences;
};

export type FormSubmissionCallback = (errors?: Errors) => void;
export type FormSubmission = (value: any, cb: FormSubmissionCallback) => void;

export type FormChangeNotificationParams = {
  path: string;
  oldValue?: any;
  newValue?: any;
  parentValue: any;
  formValue: any;
};

export type FormChangeNotification = (
  params: FormChangeNotificationParams
) => void;
export type FormChangeNotificationType = 'blur' | 'change';

export type FormConnectProps = FormBaseProps & {
  rendererOptions?: RendererOptions;
  errors?: Errors;
  value?: object;
  onSubmit: FormSubmission;
  onChangeType?: FormChangeNotificationType;
  onChange?: FormChangeNotification;
};

export type FormProps = FormBaseProps & {
  rendererOptions: RendererOptions;
  structs: IStruct[];
  value: object;
  submitting: boolean;
  navStack: NavState[];
  submitForm: () => void;
  pop: () => void;
};
