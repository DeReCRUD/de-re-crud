import { IButtonOptions } from '../../models/button-options';
import parseButtonOptions from '../parse-button-options';

describe('parseButtonOptions', () => {
  it('should assign defaults', () => {
    const expected: IButtonOptions = {
      backButton: {
        classNames: [],
        includeButtonClassNames: true,
        text: 'Back'
      },
      button: {
        classNames: []
      },
      submitButton: {
        appendStructLabel: true,
        classNames: [],
        createText: 'Create',
        includeButtonClassNames: true,
        updateText: 'Update',
        visible: true
      }
    };

    expect(parseButtonOptions()).toEqual(expected);
  });

  it('should override defaults', () => {
    const input: IButtonOptions = {
      backButton: {
        text: 'Return'
      },
      submitButton: {
        classNames: ['.action-button'],
        createText: 'Add',
        includeButtonClassNames: false
      }
    };

    const expected: IButtonOptions = {
      backButton: {
        classNames: [],
        includeButtonClassNames: true,
        text: 'Return'
      },
      button: {
        classNames: []
      },
      submitButton: {
        appendStructLabel: true,
        classNames: ['.action-button'],
        createText: 'Add',
        includeButtonClassNames: false,
        updateText: 'Update',
        visible: true
      }
    };

    expect(parseButtonOptions(input)).toEqual(expected);
  });

  it('should assign altered defaults', () => {
    const defaultOptions: IButtonOptions = {
      backButton: {
        includeButtonClassNames: false
      },
      button: {
        classNames: ['.button']
      },
      submitButton: {
        updateText: 'Save'
      }
    };

    const expected: IButtonOptions = {
      backButton: {
        classNames: [],
        includeButtonClassNames: false,
        text: 'Back'
      },
      button: {
        classNames: ['.button']
      },
      submitButton: {
        appendStructLabel: true,
        classNames: ['.button'],
        createText: 'Create',
        includeButtonClassNames: true,
        updateText: 'Save',
        visible: true
      }
    };

    expect(parseButtonOptions(null, defaultOptions)).toEqual(expected);
  });
});
