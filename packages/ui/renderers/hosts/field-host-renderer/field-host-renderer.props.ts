import {
  FieldValue,
  ObjectFieldValue,
  ScalarFieldValue,
  ICollectionReferences,
} from '@de-re-crud/core/schema';
import {
  IInternalFieldReference,
  IInternalSchema,
} from '@de-re-crud/core/schema/internal-schema';
import { INavState } from '../../../store';
import { IRendererDefinitions } from '../../defintions';
import { ChangeArrayActionType } from './field-host-renderer.actions';

export interface IFieldHostRendererConnectProps {
  rendererId: string;
  fieldPath: string;
  parentPath?: string;
  struct: string;
  fieldReference: IInternalFieldReference;
}

export interface IFieldHostRendererProps
  extends IFieldHostRendererConnectProps {
  schema: IInternalSchema;
  rendererId: string;
  renderers: IRendererDefinitions;
  collectionReferences?: ICollectionReferences;
  fieldPath: string;
  fieldValue: FieldValue;
  parentValue: ObjectFieldValue;
  formDisabled: boolean;
  formLocked: boolean;
  formSubmitting: boolean;
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
  ) => void;
  push: (state: INavState) => void;
}
