import { IStruct, Logger, InternalSchemaHelper } from '@de-re-crud/core';
import { h } from '../h';
import BaseComponent from '../renderers/base-component';
import combineCssClasses from '../renderers/utils/combine-css-classes';
import BlockHostRenderer from '../renderers/hosts/block-host-renderer';
import { IFormProps } from './form.props';

export interface IFormState {
  structs: IStruct[];
}

export default class Form extends BaseComponent<IFormProps, IFormState> {
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
      formDisabled,
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

    const struct = InternalSchemaHelper.getStruct(schema, visibleStruct);

    const disabled = formSubmitting || formLocked || formDisabled;
    const classNames = ['de-re-crud-form', className, formClassName];

    if (!struct) {
      if (!structName) {
        Logger.error(`No struct specified`);
      } else {
        Logger.error(`Struct '${structName}' is not defined.`);
      }
      return null;
    }

    if (!struct.blocks.length) {
      Logger.error(`No blocks defined for struct '${struct.name}'.`);
      return null;
    }

    if (!visibleBlock) {
      Logger.warning("No block specified, defaulting to 'default'.");
      visibleBlock = 'default';
    }

    let block = InternalSchemaHelper.getBlock(
      schema,
      struct.name,
      visibleBlock,
    );

    if (!block) {
      Logger.warning(
        `Block (${visibleBlock}) not found. Defaulting to first defined block.`,
      );

      block = InternalSchemaHelper.getBlock(
        schema,
        struct.name,
        struct.blocks[0],
      );
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
                    disabled={disabled}
                  />
                )}
                {submitButton.visible && cancelButton.visible && ' '}
                {cancelButton.visible &&
                  onCancel && (
                    <ButtonRenderer
                      classes={cancelButton.classNames}
                      text={cancelButton.text}
                      onClick={onCancel}
                      disabled={disabled}
                    />
                  )}
              </div>
            )
          : backButton.visible && (
              <ButtonRenderer
                classes={backButton.classNames}
                text={backButton.text}
                onClick={pop}
                disabled={disabled}
              />
            )}
      </form>
    );
  }
}
