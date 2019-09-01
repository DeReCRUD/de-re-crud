import { IRendererDefinitions } from '../../models/renderer-definitions';
import { IInternalSchema } from '../../schema/internal-schema';

export interface IBlockHostRendererConnectProps {
  struct: string;
  block: string;
  path: string;
}

export interface IBlockHostRendererProps
  extends IBlockHostRendererConnectProps {
  conditionCacheKey: number;
  schema: IInternalSchema;
  formId: number;
  formValue: object;
  renderers: IRendererDefinitions;
  busy: { [path: string]: boolean };
}
