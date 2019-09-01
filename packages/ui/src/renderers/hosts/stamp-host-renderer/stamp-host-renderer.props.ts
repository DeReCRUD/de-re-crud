import { IStamp } from '@de-re-crud/core';
import { IRendererDefinitions } from '../../defintions';

export interface IStampHostRendererConnectProps {
  rendererId: string;
  stamp: IStamp;
  parentPath?: string;
}

export interface IStampHostRendererProps {
  rendererId: string;
  stamp: IStamp;
  renderers: IRendererDefinitions;
}
