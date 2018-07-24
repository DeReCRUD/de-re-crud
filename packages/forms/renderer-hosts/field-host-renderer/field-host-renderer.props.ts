import { RendererOptions } from '../../models/renderer-options';
import { IFieldReference, IField } from '../../models/schema';
import { ChangeArrayActionType } from '../../renderer-hosts/field-host-renderer/field-host-renderer.actions';
import { NavState } from '../../store';
import { CollectionReferences } from '../../form/form.props';

export type FieldHostRendererConnectProps = {
  path?: string;
  fieldReference: IFieldReference;
};

export type FieldHostRendererProps = FieldHostRendererConnectProps & {
  rendererOptions: RendererOptions;
  collectionReferences?: CollectionReferences;
  fieldPath: string;
  parentPath?: string;
  formValue: object;
  touched: boolean;
  errors: string[];
  childErrors: { [index: number]: boolean };
  focusField: (field: IField, fieldPath: string) => void;
  blurField: (field: IField, fieldPath: string) => void;
  changeValue: (field: IField, fieldPath: string, value: any) => void;
  changeArrayValue: (
    field: IField,
    fieldPath: string,
    itemPath: string,
    type: ChangeArrayActionType
  ) => void;
  push: (state: NavState) => void;
  pop: () => void;
};
