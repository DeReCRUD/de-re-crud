import {
  FormSubmissionCallback,
  IFieldChangeNotificationParams,
  IFieldParentChangeNotificationParams,
  FieldChangeNotificationCallback,
  FieldParentChangeNotificationCallback,
} from '@de-re-crud/ui';

export interface IFormSubmission {
  value: any;
  onComplete: FormSubmissionCallback;
}

export interface IFieldChangeEvent {
  params: IFieldChangeNotificationParams;
  onComplete?: FieldChangeNotificationCallback;
}

export interface IFieldParentChangeEvent {
  params: IFieldParentChangeNotificationParams;
  onComplete?: FieldParentChangeNotificationCallback;
}
