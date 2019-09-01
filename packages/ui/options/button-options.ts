/**
 * The base options for all buttons.
 */
export interface IBaseButtonOptions {
  /**
   * The CSS class names to use.
   */
  classNames?: string[];
}

/**
 * The options for submit buttons.
 */
export interface ISubmitButtionOptions extends IBaseButtonOptions {
  /**
   * Indicates whether the global button CSS class names are included. Default: true.
   */
  includeButtonClassNames?: boolean;

  /**
   * The text to display. Default: 'Create'.
   */
  createText?: string;

  /**
   * The text to display. Default: 'Update'.
   */
  updateText?: string;

  /**
   * Indicates whether the struct label is appened to the text of the button.
   */
  appendStructLabel?: boolean;

  /**
   * Indicates whether button is visible. Default: true.
   */
  visible?: boolean;
}

/**
 * The options for cancel buttons.
 */
export interface ICancelButtonOptions extends IBaseButtonOptions {
  /**
   * Indicates whether the global button CSS class names are included. Default: true.
   */
  includeButtonClassNames?: boolean;

  /**
   * The text to display. Default: 'Cancel'.
   */
  text?: string;

  /**
   * Indicates whether button is visible. Default: true.
   */
  visible?: boolean;
}

/**
 * The options for back buttons.
 */
export interface IBackButtonOptions extends IBaseButtonOptions {
  /**
   * Indicates whether the global button CSS class names are included. Default: true.
   */
  includeButtonClassNames?: boolean;

  /**
   * The text to display. Default: 'Back'.
   */
  text?: string;

  /**
   * Indicates whether button is visible. Default: true.
   */
  visible?: boolean;
}

/**
 * Options applied to buttons.
 */
export interface IButtonOptions {
  /**
   * Defines the options for buttons.
   */
  button?: IBaseButtonOptions;
  /**
   * Defines the options for submit buttons.
   */
  submitButton?: ISubmitButtionOptions;
  /**
   * Defines the options for cancel buttons.
   */
  cancelButton?: ICancelButtonOptions;

  /**
   * Defines the options for back buttons.
   */
  backButton?: IBackButtonOptions;
}
