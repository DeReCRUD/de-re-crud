import { ISchema } from '@de-re-crud/core';
import { IRendererDefinitions } from '../../defintions';

export interface IBlockHostRendererConnectProps {
  struct: string;
  block: string;
  path: string;
}

export interface IBlockHostRendererProps
  extends IBlockHostRendererConnectProps {
  conditionCacheKey: number;
  schema: ISchema;
  formId: number;
  formValue: object;
  renderers: IRendererDefinitions;
  busy: { [path: string]: boolean };
}
