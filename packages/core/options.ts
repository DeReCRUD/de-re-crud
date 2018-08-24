import { IButtonOptions } from './models/button-options';
import { IRendererOptions } from './models/renderer-options';

let optionDefaultsInitialized = false;

if (process.env.NODE_ENV === 'development' && module.hot && module.hot.active) {
  module.hot.accept('./options', () => {
    optionDefaultsInitialized = false;
  });
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
    new DeReCrudOptions()
  );

  public rendererOptions?: IRendererOptions;
  public buttonOptions?: IButtonOptions;
}
