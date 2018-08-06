import { IRendererOptions } from "../../models/renderer-options";
import { IStamp } from "../../models/schema";

export interface IStampHostRendererConnectProps {
  stamp: IStamp;
  parentPath?: string;
}

export interface IStampHostRendererProps {
  stamp: IStamp;
  formValue: object;
  parentValue: object;
  rendererOptions: IRendererOptions;
}
