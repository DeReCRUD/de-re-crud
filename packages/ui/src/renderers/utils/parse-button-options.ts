import { defaults } from '@de-re-crud/core';
import {
  IButtonOptions,
  IBaseButtonOptions,
  ISubmitButtionOptions,
  IBackButtonOptions,
  ICancelButtonOptions,
} from '../../options/button-options';

export default function parseButtonOptions(
  instanceOptions: Partial<IButtonOptions> = {},
  defaultOptions: Partial<IButtonOptions> = {},
): IButtonOptions {
  const defaultBaseButtonOptions: IBaseButtonOptions = {
    classNames: [],
  };

  const defaultSubmitButtonOptions: ISubmitButtionOptions = {
    classNames: [],
    includeButtonClassNames: true,
    appendStructLabel: true,
    createText: 'Create',
    updateText: 'Update',
    visible: true,
  };

  const defaultBackButtonOptions: IBackButtonOptions = {
    classNames: [],
    includeButtonClassNames: true,
    text: 'Back',
    visible: true,
  };

  const defaultCancelButtonOptions: ICancelButtonOptions = {
    classNames: [],
    includeButtonClassNames: true,
    text: 'Cancel',
    visible: true,
  };

  const baseButtonOptions = defaults<IBaseButtonOptions>(
    instanceOptions.button,
    defaultOptions.button,
    defaultBaseButtonOptions,
  );

  const submitButtonOptions = defaults<ISubmitButtionOptions>(
    instanceOptions.submitButton,
    defaultOptions.submitButton,
    defaultSubmitButtonOptions,
  );

  const backButtonOptions = defaults<IBackButtonOptions>(
    instanceOptions.backButton,
    defaultOptions.backButton,
    defaultBackButtonOptions,
  );

  const cancelButtonOptions = defaults<ICancelButtonOptions>(
    instanceOptions.cancelButton,
    defaultOptions.cancelButton,
    defaultCancelButtonOptions,
  );

  const buttonOptions: IButtonOptions = {
    button: baseButtonOptions,
    submitButton: submitButtonOptions,
    backButton: backButtonOptions,
    cancelButton: cancelButtonOptions,
  };

  if (buttonOptions.button.classNames.length) {
    if (buttonOptions.submitButton.includeButtonClassNames) {
      buttonOptions.submitButton.classNames = buttonOptions.submitButton.classNames.concat(
        buttonOptions.button.classNames,
      );
    }

    if (buttonOptions.backButton.includeButtonClassNames) {
      buttonOptions.backButton.classNames = buttonOptions.backButton.classNames.concat(
        buttonOptions.button.classNames,
      );
    }

    if (buttonOptions.cancelButton.includeButtonClassNames) {
      buttonOptions.cancelButton.classNames = buttonOptions.cancelButton.classNames.concat(
        buttonOptions.button.classNames,
      );
    }
  }

  return buttonOptions;
}
