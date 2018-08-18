import { IRendererOptions } from '../../models/renderer-options';
import { IBlock } from '../../models/schema';

export interface IBlockHostRendererConnectProps {
  struct: string;
  block: IBlock;
  path: string;
}

export interface IBlockHostRendererProps
  extends IBlockHostRendererConnectProps {
  formId: number;
  formValue: object;
  rendererOptions: IRendererOptions;
}