import { IButtonOptions } from '../../../options/button-options';
import parseButtonOptions from '../parse-button-options';

describe('parseButtonOptions', () => {
  it('should assign defaults', () => {
    const expected: IButtonOptions = {
      backButton: {
        classNames: [],
        includeButtonClassNames: true,
        text: 'Back',
        visible: true,
      },
      button: {
        classNames: [],
      },
      cancelButton: {
        classNames: [],
        includeButtonClassNames: true,
        text: 'Cancel',
        visible: true,
      },
      submitButton: {
        appendStructLabel: true,
        classNames: [],
        createText: 'Create',
        includeButtonClassNames: true,
        updateText: 'Update',
        visible: true,
      },
    };

    expect(parseButtonOptions()).toEqual(expected);
  });

  it('should override defaults', () => {
    const input: IButtonOptions = {
      backButton: {
        text: 'Return',
        visible: true,
      },
      cancelButton: {
        text: 'Close',
        visible: false,
      },
      submitButton: {
        classNames: ['.action-button'],
        createText: 'Add',
        includeButtonClassNames: false,
      },
    };

    const expected: IButtonOptions = {
      backButton: {
        classNames: [],
        includeButtonClassNames: true,
        text: 'Return',
        visible: true,
      },
      button: {
        classNames: [],
      },
      cancelButton: {
        classNames: [],
        includeButtonClassNames: true,
        text: 'Close',
        visible: false,
      },
      submitButton: {
        appendStructLabel: true,
        classNames: ['.action-button'],
        createText: 'Add',
        includeButtonClassNames: false,
        updateText: 'Update',
        visible: true,
      },
    };

    expect(parseButtonOptions(input)).toEqual(expected);
  });

  it('should assign altered defaults', () => {
    const defaultOptions: IButtonOptions = {
      backButton: {
        includeButtonClassNames: false,
      },
      button: {
        classNames: ['.button'],
      },
      cancelButton: {
        includeButtonClassNames: false,
      },
      submitButton: {
        updateText: 'Save',
      },
    };

    const expected: IButtonOptions = {
      backButton: {
        classNames: [],
        includeButtonClassNames: false,
        text: 'Back',
        visible: true,
      },
      button: {
        classNames: ['.button'],
      },
      cancelButton: {
        classNames: [],
        includeButtonClassNames: false,
        text: 'Cancel',
        visible: true,
      },
      submitButton: {
        appendStructLabel: true,
        classNames: ['.button'],
        createText: 'Create',
        includeButtonClassNames: true,
        updateText: 'Save',
        visible: true,
      },
    };

    expect(parseButtonOptions(undefined, defaultOptions)).toEqual(expected);
  });
});
