import { h, Component } from 'preact';
import FieldHostRenderer from '@de-re-crud/forms/renderer-hosts/field-host-renderer';
import { BlockHostRendererProps } from '@de-re-crud/forms/renderer-hosts/block-host-renderer/block-host-renderer.props';

export default class BlockHostRenderer extends Component<
  BlockHostRendererProps
> {
  render({
    struct,
    block,
    rendererOptions,
    collectionReferences,
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
            collectionReferences={collectionReferences}
          />
        ))}
      </div>
    );
  }
}
