import { RendererOptions } from './models/renderer-options';

export type DeReCrudOptions = {
  rendererOptions?: RendererOptions;
};

export class DeReCrudInitializer {
  private static initialized = false;
  private static options: DeReCrudOptions = Object.freeze({});

  static setDefaults(defaults: Partial<DeReCrudOptions>) {
    if (this.initialized) {
      throw new Error('DeReCrudOptions.setDefaults can only be called once.');
    }

    this.initialized = true;
    
    this.options = Object.freeze({
      ...defaults
    });
  }

  static getDefaults(): DeReCrudOptions {
    return this.options;
  }
}
