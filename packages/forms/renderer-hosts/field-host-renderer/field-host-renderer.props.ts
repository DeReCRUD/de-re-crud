import { RendererOptions } from '../../models/renderer-options';
import { IFieldReference } from '../../models/schema';
import { ChangeArrayActionType } from './field-host-renderer.actions';
import { NavState } from '../../store';



export type FieldHostRendererConnectProps = {
  fieldReference: IFieldReference;
  rendererOptions: RendererOptions;
}

export type FieldHostRendererProps = FieldHostRendererConnectProps & {
  fieldPath: string;
  parentPath?: string;
  formValue: object;
  errors: string[];
  changeValue: (fieldPath: string, value: any) => void;
  changeArrayValue: (fieldPath: string, type: ChangeArrayActionType) => void;
  push: (state: NavState) => void;
  pop: () => void;
}
