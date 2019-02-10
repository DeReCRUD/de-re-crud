import { h } from 'preact';
import BaseComponent from '../base-component';
import { IInternalStruct } from '../internal-schema';
import Logger from '../logger';
import BlockHostRenderer from '../renderer-hosts/block-host-renderer';
import combineCssClasses from '../utils/combine-css-classes';
import shallowCompare from '../utils/shallow-compare';
import { IFormProps } from './form.props';
import { getStruct, getBlock } from '../utils/schema-helper';

export interface IFormState {
  structs: IInternalStruct[];
}

export default class Form extends BaseComponent<IFormProps, IFormState> {
  public shouldComponentUpdate(nextProps: IFormProps, nextState: IFormState) {
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const {
      schema,
      className,
      formClassName,
      type,
      struct: structName,
      block: blockName,
      renderers,
      buttonOptions: { backButton, cancelButton, submitButton },
      navStack,
      formLocked,
      formSubmitting,
      submitForm,
      pop,
      onCancel,
    } = this.props;

    if (!schema.json) {
      Logger.error('No schema defined.');
      return null;
    }

    if (!Array.isArray(schema.structs)) {
      Logger.error('Invalid schema defined.', schema.json);
      return null;
    }

    let visibleBlock: string;
    let visibleStruct: string;

    if (navStack.length) {
      const navState = navStack[navStack.length - 1];
      visibleStruct = navState.struct;
      visibleBlock = navState.block;
    } else {
      visibleStruct = structName;
      visibleBlock = blockName;
    }

    const struct = getStruct(schema, visibleStruct);

    const classNames = ['de-re-crud-form', className, formClassName];

    if (!struct) {
      Logger.error(`Struct '${struct.name}' is not defined.`);
      return null;
    }

    if (!struct.blocks.length) {
      Logger.error(`No blocks defined for struct '${struct.name}'.`);
      return null;
    }

    let block = getBlock(schema, struct.name, visibleBlock);

    if (!block) {
      Logger.warning(
        "No block specified and the 'default' block is not defined. Defalting to first defined block.",
      );

      block = getBlock(schema, struct.name, struct.blocks[0]);
    }

    const ButtonRenderer = renderers.button;
    const path = navStack.length ? navStack[navStack.length - 1].path : null;

    let submitButtonText =
      type === 'update' ? submitButton.updateText : submitButton.createText;

    if (submitButton.appendStructLabel && struct.label) {
      submitButtonText += ` ${struct.label.short}`;
    }

    return (
      <form className={combineCssClasses(...classNames)}>
        <BlockHostRenderer
          struct={struct.name}
          block={block.name}
          path={path}
        />
        {!navStack.length
          ? (submitButton.visible || onCancel) && (
              <div>
                {submitButton.visible && (
                  <ButtonRenderer
                    classes={submitButton.classNames}
                    text={submitButtonText}
                    onClick={submitForm}
                    disabled={formSubmitting || formLocked}
                  />
                )}
                {submitButton.visible && cancelButton.visible && ' '}
                {cancelButton.visible &&
                  onCancel && (
                    <ButtonRenderer
                      classes={cancelButton.classNames}
                      text={cancelButton.text}
                      onClick={onCancel}
                      disabled={formSubmitting || formLocked}
                    />
                  )}
              </div>
            )
          : backButton.visible && (
              <ButtonRenderer
                classes={backButton.classNames}
                text={backButton.text}
                onClick={pop}
                disabled={formSubmitting || formLocked}
              />
            )}
      </form>
    );
  }
}
