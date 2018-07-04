import { IStruct } from '../models/schema';
import { RendererOptions } from '../models/renderer-options';

export type FormConnectProps = {
  className?: string;
  schema: any;
  struct: string;
  block?: string;
  rendererOptions: RendererOptions;
};

export type FormProps = FormConnectProps & {
  structs: IStruct[];
};
