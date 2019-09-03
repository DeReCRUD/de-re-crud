import { IRendererDefinitions } from '../renderers/defintions';
import { IRendererOptions } from './renderer-options';
import { IButtonOptions } from './button-options';

let optionDefaultsInitialized = false;

if (typeof module !== 'undefined' && typeof module.hot !== 'undefined') {
  const hmr = module.hot;
  if (hmr) {
    hmr.accept(() => {
      optionDefaultsInitialized = false;
    });

    if (hmr.addStatusHandler) {
      hmr.addStatusHandler((status) => {
        if (status === 'apply') {
          optionDefaultsInitialized = false;
        }
      });
    }
  }
}

export class DeReCrudUiOptions {
  public static setDefaults(defaults: Partial<DeReCrudUiOptions>) {
    if (optionDefaultsInitialized) {
      throw new Error('DeReCrudUiOptions.setDefaults can only be called once.');
    }

    optionDefaultsInitialized = true;

    const options = new DeReCrudUiOptions();

    Object.assign(options, defaults);

    DeReCrudUiOptions.options = Object.freeze(options);
  }

  public static getDefaults() {
    return DeReCrudUiOptions.options;
  }

  private static options: DeReCrudUiOptions = Object.freeze(
    new DeReCrudUiOptions(),
  );

  public renderers?: Partial<IRendererDefinitions>;

  public rendererOptions?: IRendererOptions;

  public buttonOptions?: IButtonOptions;
}
