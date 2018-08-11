import { IErrors } from "../models/errors";
import { IRendererOptions } from "../models/renderer-options";
import { IOption, IStruct } from "../models/schema";
import { INavState } from "../store";

export type CollectionReference = (formValue: any) => IOption[];

export interface ICollectionReferences {
  [key: string]: CollectionReference;
}

interface IFormBaseProps {
  className?: string;
  schema: any;
  struct: string;
  block?: string;
  collectionReferences?: ICollectionReferences;
}

export type FormSubmissionCallback = (errors?: IErrors) => void;
export type FormSubmission = (value: any, cb: FormSubmissionCallback) => void;

export interface IFormChangeNotificationParams {
  path: string;
  oldValue?: any;
  newValue?: any;
  parentValue: any;
  formValue: any;
}

export type FormChangeNotification = (
  params: IFormChangeNotificationParams
) => void;

export type FormChangeNotificationType = "blur" | "change";

export interface IFormConnectProps extends IFormBaseProps {
  rendererOptions?: IRendererOptions;
  errors?: IErrors;
  value?: object;
  onSubmit: FormSubmission;
  onChangeType?: FormChangeNotificationType;
  onChange?: FormChangeNotification;
}

export interface IFormProps extends IFormBaseProps {
  rendererOptions: IRendererOptions;
  structs: IStruct[];
  value: object;
  submitting: boolean;
  navStack: INavState[];
  submitForm: () => void;
  pop: () => void;
}
