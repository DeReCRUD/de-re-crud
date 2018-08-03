import { h, Component } from 'preact';
import { IFieldReference, IStamp } from '../../models/schema';
import StampHostRenderer from '../stamp-host-renderer';
import FieldHostRenderer from '../field-host-renderer';
import { BlockHostRendererProps } from './block-host-renderer.props';

export default class BlockHostRenderer extends Component<
  BlockHostRendererProps
  > {
  render({ struct, block, path, formValue }: BlockHostRendererProps) {
    if (!block.condition(formValue)) {
      return null;
    }

    return (
      <div class="de-re-crud-block-renderer">
        {block.items.map(item => {
          const stamp = item as IStamp;
          if (stamp.text) {
            return (
              <StampHostRenderer
                key={`${struct}${path && `-${path}`}-stamp-${
                  stamp.blockInstance
                  }`}
                stamp={stamp}
                parentPath={path}
              />
            );
          }

          const fieldReference = item as IFieldReference;
          if (fieldReference.field) {
            return (
              <FieldHostRenderer
                key={`${struct}${path && `-${path}`}-${
                  fieldReference.field.name
                  }`}
                fieldReference={fieldReference}
                parentPath={path}
              />
            );
          }
        })}
      </div>
    );
  }
}
