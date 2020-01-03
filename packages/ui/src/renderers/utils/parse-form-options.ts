import { DeReCrudUiOptions } from '../../options';
import { IButtonOptions, IRendererDefinitions, IRendererOptions } from '../..';
import parseButtonOptions from './parse-button-options';
import parseRendererOptions from './parse-renderer-options';

export interface IFormOptions {
  buttonOptions?: IButtonOptions;
  rendererOptions?: IRendererOptions;
  renderers?: Partial<IRendererDefinitions>;
}

export interface IParsedFormOptions {
  buttonOptions: IButtonOptions;
  rendererOptions?: IRendererOptions;
  renderers: IRendererDefinitions;
}

export default function parseFormOptions(
  globalOptions: DeReCrudUiOptions,
  options: IFormOptions,
): IParsedFormOptions {
  const rendererOptionDefaults =
    options.rendererOptions || globalOptions.rendererOptions;

  const buttonOptions = parseButtonOptions(
    options.buttonOptions,
    globalOptions.buttonOptions,
  );

  const renderers = parseRendererOptions(
    rendererOptionDefaults,
    options.renderers,
    globalOptions.renderers,
  );

  return {
    rendererOptions: rendererOptionDefaults,
    buttonOptions,
    renderers,
  };
}
