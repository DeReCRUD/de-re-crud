import { IStamp } from "../../models/schema";
import { RendererOptions } from "../../models/renderer-options";

export type StampHostRendererConnectProps = {
  stamp: IStamp;
  parentPath?: string;
};

export type StampHostRendererProps = {
  stamp: IStamp;
  formValue: object;
  parentValue: object;
  rendererOptions: RendererOptions;
};
