import { IStamp } from '@de-re-crud/core';
import { IRendererDefinitions } from '../../defintions';

export interface IStampHostRendererConnectProps {
  formId: string;
  rendererId: string;
  stamp: IStamp;
  parentPath?: string;
}

export interface IStampHostRendererProps
  extends IStampHostRendererConnectProps {
  renderers: IRendererDefinitions;
}
