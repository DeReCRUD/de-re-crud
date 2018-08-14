import { IRendererOptions } from '../../models/renderer-options';
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
  rendererOptions: IRendererOptions;
}
