import { IStruct } from '../models/schema';
import { RendererOptions } from '../models/renderer-options';
import { NavState, Errors } from '../store';

type FormBaseProps = {
  className?: string;
  schema: any;
  struct: string;
  block?: string;
  rendererOptions: RendererOptions;
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

export type FormChangeNotification = (params: FormChangeNotificationParams) => void;
export type FormChangeNotificationType = 'blur' | 'change';

export type FormConnectProps = FormBaseProps & {
  errors?: Errors;
  value?: object;
  onSubmit: FormSubmission;
  onChangeType?: FormChangeNotificationType;
  onChange?: FormChangeNotification;
};

export type FormProps = FormBaseProps & {
  structs: IStruct[];
  value: object;
  submitting: boolean;
  navStack: NavState[];
  submitForm: () => void;
  pop: () => void;
};
