import { IButtonOptions } from './models/button-options';
import { IRendererDefinitions } from './models/renderer-definitions';
import { IRendererOptions } from './models/renderer-options';

let optionDefaultsInitialized = false;

if (module.hot) {
  module.hot.accept(() => {
    optionDefaultsInitialized = false;
  });

  if (module.hot.addStatusHandler) {
    module.hot.addStatusHandler((status) => {
      if (status === 'apply') {
        optionDefaultsInitialized = false;
      }
    });
  }
}

export class DeReCrudOptions {
  public static setDefaults(defaults: Partial<DeReCrudOptions>) {
    if (optionDefaultsInitialized) {
      throw new Error('DeReCrudOptions.setDefaults can only be called once.');
    }

    optionDefaultsInitialized = true;

    const options = new DeReCrudOptions();

    Object.assign(options, defaults);

    this.options = Object.freeze(options);
  }

  public static getDefaults() {
    return this.options;
  }

  private static options: DeReCrudOptions = Object.freeze(
    new DeReCrudOptions(),
  );

  public renderers?: Partial<IRendererDefinitions>;

  public rendererOptions?: IRendererOptions;

  public buttonOptions?: IButtonOptions;
}
