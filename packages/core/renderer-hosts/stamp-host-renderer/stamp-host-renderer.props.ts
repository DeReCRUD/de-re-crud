import { IRendererDefinitions } from '../../models/renderer-definitions';
import { IInternalStamp } from '../../schema/internal-schema';

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
