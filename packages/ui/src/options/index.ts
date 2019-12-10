import { Logger } from '@de-re-crud/core';
import { IRendererDefinitions } from '../renderers/defintions';
import { IRendererOptions } from './renderer-options';
import { IButtonOptions } from './button-options';

export class DeReCrudUiOptions {
  private static optionDefaultsInitialized = false;

  public static setDefaults(defaults: Partial<DeReCrudUiOptions>) {
    if (module.hot) {
      module.hot.accept(() => {
        this.optionDefaultsInitialized = false;
      });

      if (module.hot.addStatusHandler) {
        module.hot.addStatusHandler((status) => {
          if (status === 'apply') {
            this.optionDefaultsInitialized = false;
          }
        });
      }
    }

    if (this.optionDefaultsInitialized) {
      Logger.warning('DeReCrudUiOptions.setDefaults can only be called once.');
      return;
    }

    this.optionDefaultsInitialized = true;

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
