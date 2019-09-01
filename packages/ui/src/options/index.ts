import { IRendererDefinitions } from '../renderers/defintions';
import { IRendererOptions } from './renderer-options';
import { IButtonOptions } from './button-options';

let optionDefaultsInitialized = false;

if (typeof module !== 'undefined') {
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

    this.options = Object.freeze(options);
  }

  public static getDefaults() {
    return this.options;
  }

  private static options: DeReCrudUiOptions = Object.freeze(
    new DeReCrudUiOptions(),
  );

  public renderers?: Partial<IRendererDefinitions>;

  public rendererOptions?: IRendererOptions;

  public buttonOptions?: IButtonOptions;
}
