import { h, Component, render } from 'preact';
import { IStruct } from '../models/schema';
import Logger from '../logger';
import BlockHostRenderer from '../renderer-hosts/block-host-renderer.component';
import shallowCompare from '../shallow-compare';
import { FormProps } from './form.props';

export interface FormState {
  structs: IStruct[];
}

export default class Form extends Component<FormProps, FormState> {
  shouldComponentUpdate(nextProps: FormProps, nextState: FormState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render(
    { className, structs, struct, block, rendererOptions }: FormProps,
  ) {
    const blockName = block || 'default';
    const structReference = structs.find(x => x.name === struct);
    const classes = [
      'de-re-crud-form',
      className,
      rendererOptions.formClassName
    ];

    if (!structReference) {
      Logger.error(`Struct '${struct}' is not defined.`);
      return null;
    }

    if (!structReference.blocks.length) {
      Logger.error(`No blocks defined for struct '${struct}'.`);
      return null;
    }

    let blockReference = structReference.blocks.find(x => x.name === block);
    if (!blockReference) {
      Logger.warning(
        `No block specified and the 'default' block is not defined. Defalting to first defined block.`
      );
      blockReference = structReference.blocks[0];
    }

    return (
      <form className={classes.filter(x => x).join(' ')}>
        <BlockHostRenderer
          struct={struct}
          block={blockReference}
          rendererOptions={rendererOptions}
        />
      </form>
    );
  }
}
