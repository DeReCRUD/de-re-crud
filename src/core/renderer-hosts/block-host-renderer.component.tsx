import { h, Component } from 'preact';
import { IBlock } from '../models/schema';
import FieldHostRenderer from './field-host-renderer.component';
import { RendererOptions } from '../models/renderer-options';

export interface BlockHostRendererProps {
  struct: string;
  block: IBlock;
  rendererOptions: RendererOptions;
}

export default class BlockHostRenderer extends Component<
  BlockHostRendererProps
> {
  render({ struct, block, rendererOptions }: BlockHostRendererProps) {
    const FieldContainerComponent = rendererOptions.components.fieldContainer;

    return (
      <div class="">
        {block.fields.map(fieldReference => (
          <FieldContainerComponent
            key={`${struct}-${fieldReference.field.name}`}
            field={fieldReference.field}
          >
            <FieldHostRenderer
              field={fieldReference.field}
              rendererOptions={rendererOptions}
            />
          </FieldContainerComponent>
        ))}
      </div>
    );
  }
}
