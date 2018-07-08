import { RendererOptions } from '../../models/renderer-options';
import { IFieldReference } from '../../models/schema';



export type FieldHostRendererConnectProps = {
  fieldReference: IFieldReference;
  rendererOptions: RendererOptions;
}

type FieldHostRendererParentProps = FieldHostRendererConnectProps & {
  formValue: object;
  onChange: (fieldPath: string, value: any) => void;
}

export type FieldHostRendererChildProps = FieldHostRendererParentProps & {
  path: string;
  parentPath: string;
  formValue: object;
  onChange: (fieldPath: string, value: any) => void;
}

export type FieldHostRendererProps = FieldHostRendererParentProps | FieldHostRendererChildProps;
