import { useContext } from 'preact/hooks';
import { Logger, InternalSchemaHelper } from '@de-re-crud/core';
import { h, FunctionalComponent } from 'preact';
import combineCssClasses from '../renderers/utils/combine-css-classes';
import BlockHostRenderer from '../renderers/hosts/block-host-renderer';
import { IFormProps } from './form.props';
import { FormContext } from './form.context';
import NavContext from '../utils/navigation/context';

const Form: FunctionalComponent<IFormProps> = (props) => {
  const { submitting, submit } = useContext(FormContext);
  const { stack: navStack, pop } = useContext(NavContext);

  const {
    schema,
    className,
    formClassName,
    type,
    struct: structName,
    block: blockName,
    renderers,
    buttonOptions: { backButton, cancelButton, submitButton },
    formDisabled,
    formLocked,
    onCancel,
  } = props;

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

  const disabled = submitting || formLocked || formDisabled;
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

  let block = InternalSchemaHelper.getBlock(schema, struct.name, visibleBlock);

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
      <BlockHostRenderer struct={struct.name} block={block.name} path={path} />
      {!navStack.length
        ? (submitButton.visible || onCancel) && (
            <div>
              {submitButton.visible && (
                <ButtonRenderer
                  classes={submitButton.classNames}
                  text={submitButtonText}
                  onClick={submit}
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
};

export default Form;
