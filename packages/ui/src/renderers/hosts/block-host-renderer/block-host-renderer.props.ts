import { IInternalSchema } from '@de-re-crud/core';
import { IRendererDefinitions } from '../../defintions';

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
