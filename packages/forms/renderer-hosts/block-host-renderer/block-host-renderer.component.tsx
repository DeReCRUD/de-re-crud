import { h, Component } from 'preact';
import FieldHostRenderer from '../field-host-renderer';
import { BlockHostRendererProps } from './block-host-renderer.props';

export default class BlockHostRenderer extends Component<
  BlockHostRendererProps
> {
  render({
    struct,
    block,
    rendererOptions,
    formValue
  }: BlockHostRendererProps) {
    if (!block.condition(formValue)) {
      return null;
    }

    return (
      <div class="de-re-crud-block-renderer">
        {block.fields.map(fieldReference => (
          <FieldHostRenderer
            key={`${struct}-${fieldReference.field.name}`}
            fieldReference={fieldReference}
            rendererOptions={rendererOptions}
          />
        ))}
      </div>
    );
  }
}
