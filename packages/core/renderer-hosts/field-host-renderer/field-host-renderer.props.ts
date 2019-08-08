import { ICollectionReferences } from '../../form/form.props';
import {
  IInternalFieldReference,
  IInternalSchema,
} from '../../internal-schema';
import { IRendererDefinitions } from '../../models/renderer-definitions';
import {
  ComplexFieldValue,
  FieldValue,
  SimpleFieldValue,
} from '../../models/schema';
import { ChangeArrayActionType } from './field-host-renderer.actions';
import { INavState } from '../../store';

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
  parentValue: ComplexFieldValue;
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
    value: SimpleFieldValue | SimpleFieldValue[],
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
