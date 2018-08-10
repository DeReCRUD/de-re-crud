import { Component, h } from "preact";
import Logger from "../logger";
import { IStruct } from "../models/schema";
import BlockHostRenderer from "../renderer-hosts/block-host-renderer";
import combineCssClasses from "../utils/combine-css-classes";
import shallowCompare from "../utils/shallow-compare";
import { IFormProps } from "./form.props";

export interface IFormState {
  structs: IStruct[];
}

export default class Form extends Component<IFormProps, IFormState> {
  public shouldComponentUpdate(nextProps: IFormProps, nextState: IFormState) {
    return shallowCompare(this, nextProps, nextState);
  }

  public render({
    schema,
    className,
    structs,
    struct,
    block,
    rendererOptions,
    navStack,
    submitting,
    submitForm,
    pop
  }: IFormProps) {
    if (!schema) {
      Logger.error("No schema defined.");
    }

    if (!Array.isArray(schema)) {
      Logger.error("Invalid schema defined.", schema);
      return null;
    }

    if (!rendererOptions || !rendererOptions.components) {
      Logger.error(
        "No rendererOptions have been set. Use DeReCrudOptions.setDefaults or rendererOptions on the form instance."
      );
      return null;
    }

    let visibleBlock: string;
    let visibleStruct: string;

    if (navStack.length) {
      const navState = navStack[navStack.length - 1];
      visibleStruct = navState.struct;
      visibleBlock = navState.block;
    } else {
      visibleStruct = struct;
      visibleBlock = block;
    }

    const structReference = structs.find((x) => x.name === visibleStruct);

    const classNames = [
      "de-re-crud-form",
      className,
      rendererOptions.formClassName
    ];

    if (!structReference) {
      Logger.error(`Struct '${struct}' is not defined.`, structs);
      return null;
    }

    if (!structReference.blocks.length) {
      Logger.error(`No blocks defined for struct '${visibleStruct}'.`, structReference);
      return null;
    }

    let blockReference = structReference.blocks.find(
      (x) => x.name === visibleBlock
    );

    if (!blockReference) {
      Logger.warning(
        `No block specified and the 'default' block is not defined. Defalting to first defined block.`
      );

      blockReference = structReference.blocks[0];
    }

    const ButtonRenderer = rendererOptions.components.button;
    const path = navStack.length ? navStack[navStack.length - 1].path : null;

    return (
      <form className={combineCssClasses(...classNames)}>
        <BlockHostRenderer
          struct={visibleStruct}
          block={blockReference}
          path={path}
        />
        {!navStack.length ? (
          <ButtonRenderer
            text="Submit"
            onClick={submitForm}
            disabled={submitting}
          />
        ) : (
          <ButtonRenderer text="Back" onClick={pop} />
        )}
      </form>
    );
  }
}
