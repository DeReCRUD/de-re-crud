import { IInternalStruct } from '@de-re-crud/core/schema/internal-schema';
import Logger from '@de-re-crud/core/logger';
import { getStruct, getBlock } from '@de-re-crud/core/schema/schema-helper';
import { h } from '../h';
import BaseComponent from '../renderers/base-component';
import { combineCssClasses } from '../renderers/utils';
import BlockHostRenderer from '../renderers/hosts/block-host-renderer';
import { IFormProps } from './form.props';

export interface IFormState {
  structs: IInternalStruct[];
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

    if (!schema.raw) {
      Logger.error('No schema defined.');
      return null;
    }

    if (!Array.isArray(schema.structs)) {
      Logger.error('Invalid schema defined.', schema.raw);
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
