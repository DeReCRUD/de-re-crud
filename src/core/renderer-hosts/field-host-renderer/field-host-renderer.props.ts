import { RendererOptions } from '../../models/renderer-options';
import { IFieldReference } from '../../models/schema';
import { ChangeArrayActionType } from './field-host-renderer.actions';
import { NavState } from '../../store';



export type FieldHostRendererConnectProps = {
  fieldReference: IFieldReference;
  rendererOptions: RendererOptions;
}

type FieldHostRendererParentProps = FieldHostRendererConnectProps & {
  formValue: object;
  changeValue: (fieldPath: string, value: any) => void;
  changeArrayValue: (fieldPath: string, type: ChangeArrayActionType) => void;
  push: (state: NavState) => void;
  pop: () => void;
}

export type FieldHostRendererChildProps = FieldHostRendererParentProps & {
  path: string;
  parentPath: string;
}

export type FieldHostRendererProps = FieldHostRendererParentProps | FieldHostRendererChildProps;
