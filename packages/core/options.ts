import { IRendererOptions } from './models/renderer-options';

export class DeReCrudOptions {
  public static setDefaults(defaults: Partial<DeReCrudOptions>) {
    if (this.initialized) {
      throw new Error('DeReCrudOptions.setDefaults can only be called once.');
    }

    this.initialized = true;

    const options = new DeReCrudOptions();
    Object.assign(options, defaults);

    this.options = Object.freeze(options);
  }

  public static getDefaults() {
    return this.options;
  }

  private static initialized = false;
  private static options: DeReCrudOptions = Object.freeze(
    new DeReCrudOptions()
  );

  public rendererOptions?: IRendererOptions;
}
