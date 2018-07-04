import { h, Component, render } from 'preact';
import SchemaParser from '../schema-parser';
import { IStruct } from '../models/schema';
import Logger from '../logger';
import BlockHostRenderer from '../renderer-hosts/block-host-renderer.component';
import {
  FieldContainerRendererProps,
  FieldRendererProps
} from '../models/renderers';
import { RendererOptions } from '../models/renderer-options';

export interface FormProps {
  className?: string;
  schema: any;
  struct: string;
  block?: string;
  rendererOptions: RendererOptions;
}

export interface FormState {
  structs: IStruct[];
}

export default class Form extends Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);

    this.state = {
      structs: SchemaParser.parse(props.schema)
    };
  }

  componentWillReceiveProps(nextProps: FormProps) {
    if (nextProps.struct !== this.props.struct) {
      this.setState({
        structs: SchemaParser.parse(nextProps.schema)
      });
    }
  }

  shouldComponentUpdate(nextProps: FormProps) {
    return (
      nextProps.schema !== this.props.schema ||
      nextProps.block !== this.props.block ||
      nextProps.struct !== this.props.struct ||
      nextProps.rendererOptions !== this.props.rendererOptions
    );
  }

  render(
    { className, struct, block, rendererOptions }: FormProps,
  ) {
    const blockName = block || 'default';
    const structReference = this.state.structs.find(x => x.name === struct);
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
      <form className={classes.filter(x => x).join(',')}>
        <BlockHostRenderer
          struct={struct}
          block={blockReference}
          rendererOptions={rendererOptions}
        />
      </form>
    );
  }
}
