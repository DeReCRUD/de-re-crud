import { h, Component } from 'preact';
import FieldHostRenderer from '../field-host-renderer';
import { BlockHostRendererProps } from './block-host-renderer.props';

export default class BlockHostRenderer extends Component<
  BlockHostRendererProps
> {
  render({ struct, block, rendererOptions, formValue }: BlockHostRendererProps) {
    const FieldContainerRenderer = rendererOptions.components.fieldContainer;

    if (!block.condition(formValue)) {
      return null;
    }

    return (
      <div class="de-re-crud-block-renderer">
        {block.fields.map(fieldReference => (
          <FieldContainerRenderer
            key={`${struct}-${fieldReference.field.name}`}
            fieldName={fieldReference.field.name}
          >
            <FieldHostRenderer
              fieldReference={fieldReference}
              rendererOptions={rendererOptions}
            />
          </FieldContainerRenderer>
        ))}
      </div>
    );
  }
}
