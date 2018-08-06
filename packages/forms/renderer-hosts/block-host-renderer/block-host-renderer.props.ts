import { IBlock } from "../../models/schema";
import { RendererOptions } from "../../models/renderer-options";

export type BlockHostRendererConnectProps = {
  struct: string;
  block: IBlock;
  path: string;
};

export type BlockHostRendererProps = BlockHostRendererConnectProps & {
  formValue: object;
};
