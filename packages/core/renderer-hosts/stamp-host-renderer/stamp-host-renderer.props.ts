import { IRendererDefinitions } from '../../models/renderer-definitions';
import { IStamp } from '../../models/schema';

export interface IStampHostRendererConnectProps {
  rendererId: string;
  stamp: IStamp;
  parentPath?: string;
}

export interface IStampHostRendererProps {
  rendererId: string;
  stamp: IStamp;
  formValue: object;
  parentValue: object;
  renderers: IRendererDefinitions;
}
