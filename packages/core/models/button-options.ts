/**
 * Options applied to buttons.
 */
export interface IButtonOptions {
  /**
   * Defines the options for buttons.
   */
  button?: {
    /**
     * The CSS class names to use
     */
    classNames?: string[];
  };
  /**
   * Defines the options for submit buttons.
   */
  submitButton?: {
    /**
     * The CSS class names to use.
     */
    classNames?: string[];

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
  };
  /**
   * Defines the options for back buttons.
   */
  backButton?: {
    /**
     * The CSS class names to use.
     */
    classNames?: string[];

    /**
     * Indicates whether the global button CSS class names are included. Default: true.
     */
    includeButtonClassNames?: boolean;

    /**
     * The text to display. Default: 'Back'.
     */
    text?: string;
  };
}
