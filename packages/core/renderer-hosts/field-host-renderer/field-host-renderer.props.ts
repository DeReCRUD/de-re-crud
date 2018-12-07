import { ICollectionReferences } from '../../form/form.props';
import { IRendererOptions } from '../../models/renderer-options';
import {
  ComplexFieldValue,
  FieldValue,
  IField,
  IFieldReference,
  ILinkedStructField,
  SimpleFieldValue,
} from '../../models/schema';
import { ChangeArrayActionType } from '../../renderer-hosts/field-host-renderer/field-host-renderer.actions';
import { INavState } from '../../store';

export interface IFieldHostRendererConnectProps {
  rendererId: string;
  fieldPath: string;
  parentPath?: string;
  fieldReference: IFieldReference;
}

export interface IFieldHostRendererProps
  extends IFieldHostRendererConnectProps {
  rendererId: string;
  rendererOptions: IRendererOptions;
  collectionReferences?: ICollectionReferences;
  fieldPath: string;
  fieldValue: FieldValue;
  parentValue: ComplexFieldValue;
  formLocked: boolean;
  formValue: object;
  touched: boolean;
  readOnly: { [path: string]: boolean };
  externalErrors: string[];
  errors: string[];
  childErrors: { [index: number]: boolean };
  focusField: (field: IField, fieldPath: string) => void;
  blurField: (field: IField, fieldPath: string, parentPath?: string) => void;
  changeValue: (
    field: IField,
    fieldPath: string,
    value: SimpleFieldValue | SimpleFieldValue[],
  ) => void;
  changeArrayValue: (
    field: ILinkedStructField,
    fieldPath: string,
    type: ChangeArrayActionType,
    startingIndex: number,
    count: number,
    navigateFunc?: (index: number) => void,
  ) => void;
  push: (state: INavState) => void;
}
