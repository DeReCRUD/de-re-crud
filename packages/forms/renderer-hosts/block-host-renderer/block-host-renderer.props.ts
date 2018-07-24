import { IBlock } from '../../models/schema';

export type BlockHostRendererConnectProps = {
  struct: string;
  block: IBlock;
  path: string;
};

export type BlockHostRendererProps = BlockHostRendererConnectProps & {
  formValue: object;
};
