import { IBlock } from '../../models/schema';
import { RendererOptions } from '../../models/renderer-options';
import { CollectionReferences } from '../../form/form.props';

export type BlockHostRendererConnectProps = {
  struct: string;
  block: IBlock;
  rendererOptions: RendererOptions;
  collectionReferences?: CollectionReferences[];
};

export type BlockHostRendererProps = BlockHostRendererConnectProps & {
  formValue: object;
};
