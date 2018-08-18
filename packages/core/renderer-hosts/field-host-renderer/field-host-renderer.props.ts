import { ICollectionReferences } from '../../form/form.props';
import { IRendererOptions } from '../../models/renderer-options';
import { IField, IFieldReference } from '../../models/schema';
import { ChangeArrayActionType } from '../../renderer-hosts/field-host-renderer/field-host-renderer.actions';
import { INavState } from '../../store';

export interface IFieldHostRendererConnectProps {
  rendererId: string;
  fieldPath: string;
  fieldValue: any;
  parentPath?: string;
  fieldReference: IFieldReference;
}

export interface IFieldHostRendererProps
  extends IFieldHostRendererConnectProps {
  rendererId: string;
  rendererOptions: IRendererOptions;
  collectionReferences?: ICollectionReferences;
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
  push: (state: INavState) => void;
  pop: () => void;
}
