import { IInternalStamp } from '../../internal-schema';
import { IRendererDefinitions } from '../../models/renderer-definitions';

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
