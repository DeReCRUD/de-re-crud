import {
  FieldValue,
  ObjectFieldValue,
  ScalarFieldValue,
  ICollectionReferences,
  IFieldReference,
  ISchema,
} from '@de-re-crud/core';
import { IRendererDefinitions } from '../../defintions';
import { ChangeArrayActionType } from './field-host-renderer.actions';

export interface IFieldHostRendererConnectProps {
  formId: string;
  rendererId: string;
  fieldPath: string;
  parentPath?: string;
  struct: string;
  fieldReference: IFieldReference;
}

export interface IFieldHostRendererProps
  extends IFieldHostRendererConnectProps {
  schema: ISchema;
  rendererId: string;
  renderers: IRendererDefinitions;
  collectionReferences?: ICollectionReferences;
  fieldPath: string;
  fieldValue: FieldValue;
  parentValue: ObjectFieldValue;
  formSubmitting: boolean;
  formDisabled: boolean;
  formLocked: boolean;
  formValue: object;
  touched: boolean;
  busy: { [path: string]: boolean };
  externalErrors: string[];
  errors: string[];
  childErrors: { [index: number]: boolean };
  focusField: (
    structName: string,
    fieldName: string,
    fieldPath: string,
  ) => void;
  blurField: (
    structName: string,
    fieldName: string,
    fieldPath: string,
    parentPath?: string,
  ) => void;
  changeValue: (
    structName: string,
    fieldName: string,
    fieldPath: string,
    value: ScalarFieldValue | ScalarFieldValue[],
  ) => void;
  changeArrayValue: (
    structName: string,
    fieldName: string,
    fieldPath: string,
    type: ChangeArrayActionType,
    startingIndex: number,
    count: number,
    navigateFunc?: (index: number) => void,
    values?: object[],
  ) => void;
}
