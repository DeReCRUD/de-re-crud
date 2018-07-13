import { IStruct } from '../models/schema';
import { RendererOptions } from '../models/renderer-options';
import { NavState, Errors } from '../store';

type FormBaseProps = {
  className?: string;
  schema: any;
  struct: string;
  block?: string;
  rendererOptions: RendererOptions;
};

export type FormConnectProps = FormBaseProps & {
  errors?: Errors;
  value?: object;
};

export type FormProps = FormBaseProps & {
  structs: IStruct[];
  value: object;
  navStack: NavState[];
  submitForm: () => void;
  pop: () => void;
};
