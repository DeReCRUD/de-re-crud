import { IInternalStamp } from '@de-re-crud/core';
import { IRendererDefinitions } from '../../defintions';

export interface IStampHostRendererConnectProps {
  rendererId: string;
  stamp: IInternalStamp;
  parentPath?: string;
}

export interface IStampHostRendererProps {
  rendererId: string;
  stamp: IInternalStamp;
  renderers: IRendererDefinitions;
}