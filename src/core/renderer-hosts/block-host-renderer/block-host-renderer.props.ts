import { IBlock } from '../../models/schema';
import { RendererOptions } from '../../models/renderer-options';

export type BlockHostRendererConnectProps = {
  struct: string;
  block: IBlock;
  rendererOptions: RendererOptions;
};

export type BlockHostRendererProps = BlockHostRendererConnectProps & {
  formValue: object;
};
