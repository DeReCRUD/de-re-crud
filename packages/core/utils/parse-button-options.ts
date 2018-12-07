import { IButtonOptions } from '../models/button-options';

export default function parseButtonOptions(
  instanceOptions: IButtonOptions = {},
  defaultOptions: IButtonOptions = {},
): IButtonOptions {
  const buttonOptions: IButtonOptions = defaultOptions;

  if (!buttonOptions.button) {
    buttonOptions.button = {};
  }

  if (!buttonOptions.backButton) {
    buttonOptions.backButton = {};
  }

  if (!buttonOptions.cancelButton) {
    buttonOptions.cancelButton = {};
  }

  if (!buttonOptions.submitButton) {
    buttonOptions.submitButton = {};
  }

  if (instanceOptions && instanceOptions.button) {
    assignIfDefined(buttonOptions.button, 'classNames', instanceOptions.button);
  }

  if (instanceOptions && instanceOptions.cancelButton) {
    assignIfDefined(
      buttonOptions.cancelButton,
      'classNames',
      instanceOptions.cancelButton,
    );

    assignIfDefined(
      buttonOptions.cancelButton,
      'includeButtonClassNames',
      instanceOptions.cancelButton,
    );

    assignIfDefined(
      buttonOptions.cancelButton,
      'text',
      instanceOptions.cancelButton,
    );

    assignIfDefined(
      buttonOptions.cancelButton,
      'visible',
      instanceOptions.cancelButton,
    );
  }

  if (instanceOptions && instanceOptions.submitButton) {
    assignIfDefined(
      buttonOptions.submitButton,
      'classNames',
      instanceOptions.submitButton,
    );

    assignIfDefined(
      buttonOptions.submitButton,
      'includeButtonClassNames',
      instanceOptions.submitButton,
    );

    assignIfDefined(
      buttonOptions.submitButton,
      'appendStructLabel',
      instanceOptions.submitButton,
    );

    assignIfDefined(
      buttonOptions.submitButton,
      'createText',
      instanceOptions.submitButton,
    );

    assignIfDefined(
      buttonOptions.submitButton,
      'updateText',
      instanceOptions.submitButton,
    );

    assignIfDefined(
      buttonOptions.submitButton,
      'visible',
      instanceOptions.submitButton,
    );
  }

  if (instanceOptions && instanceOptions.backButton) {
    assignIfDefined(
      buttonOptions.backButton,
      'classNames',
      instanceOptions.backButton,
    );

    assignIfDefined(
      buttonOptions.backButton,
      'includeButtonClassNames',
      instanceOptions.backButton,
    );

    assignIfDefined(
      buttonOptions.backButton,
      'text',
      instanceOptions.backButton,
    );

    assignIfDefined(
      buttonOptions.backButton,
      'visible',
      instanceOptions.backButton,
    );
  }

  assignDefault(buttonOptions.button, 'classNames', []);

  assignDefault(buttonOptions.submitButton, 'classNames', []);
  assignDefault(buttonOptions.submitButton, 'includeButtonClassNames', true);
  assignDefault(buttonOptions.submitButton, 'appendStructLabel', true);
  assignDefault(buttonOptions.submitButton, 'createText', 'Create');
  assignDefault(buttonOptions.submitButton, 'updateText', 'Update');
  assignDefault(buttonOptions.submitButton, 'visible', true);

  assignDefault(buttonOptions.backButton, 'classNames', []);
  assignDefault(buttonOptions.backButton, 'includeButtonClassNames', true);
  assignDefault(buttonOptions.backButton, 'text', 'Back');
  assignDefault(buttonOptions.backButton, 'visible', true);

  assignDefault(buttonOptions.cancelButton, 'classNames', []);
  assignDefault(buttonOptions.cancelButton, 'includeButtonClassNames', true);
  assignDefault(buttonOptions.cancelButton, 'text', 'Cancel');
  assignDefault(buttonOptions.cancelButton, 'visible', true);

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

function assignIfDefined(obj: object, key: string, source: object) {
  if (!isUndefined(source, key)) {
    obj[key] = source[key];
  }
}

function assignDefault<T>(obj: object, key: string, defaultValue: T) {
  if (isUndefined(obj, key)) {
    obj[key] = defaultValue;
  }
}

function isUndefined(obj: object, key: string) {
  return typeof obj[key] === 'undefined';
}
