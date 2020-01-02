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
  options: IFormOptions,
): IParsedFormOptions {
  const optionDefaults = DeReCrudUiOptions.getDefaults();

  const rendererOptionDefaults =
    options.rendererOptions || optionDefaults.rendererOptions;
  const buttonOptions = parseButtonOptions(
    options.buttonOptions,
    optionDefaults.buttonOptions,
  );
  const renderers = parseRendererOptions(
    rendererOptionDefaults,
    options.renderers,
    options.renderers,
  );

  return {
    rendererOptions: rendererOptionDefaults,
    buttonOptions,
    renderers,
  };
}
