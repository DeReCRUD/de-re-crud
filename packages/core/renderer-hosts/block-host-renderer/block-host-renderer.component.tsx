import { h } from 'preact';
import BaseComponent from '../../base-component';
import { IFieldReference, IStamp } from '../../models/schema';
import FieldHostRenderer from '../field-host-renderer';
import StampHostRenderer from '../stamp-host-renderer';
import { IBlockHostRendererProps } from './block-host-renderer.props';

export default class BlockHostRenderer extends BaseComponent<
  IBlockHostRendererProps
> {
  public render() {
    const { formId, struct, block, path: parentPath, formValue } = this.props;

    if (!block.condition(formValue)) {
      return null;
    }

    return (
      <div class="de-re-crud-block-renderer">
        {block.items.map((item) => {
          const stamp = item as IStamp;

          if (stamp.text) {
            let path = `stamp.${stamp.blockInstance}`;
            if (parentPath) {
              path = `${parentPath}.${path}`;
            }

            const rendererId = `${formId}.${path}`;

            return (
              <StampHostRenderer
                key={`${struct}-${rendererId}`}
                rendererId={rendererId}
                stamp={stamp}
                parentPath={parentPath}
              />
            );
          }

          const fieldReference = item as IFieldReference;
          if (fieldReference.field) {
            const { name: fieldName } = fieldReference.field;
            const fieldPath = parentPath
              ? `${parentPath}.${fieldName}`
              : fieldName;

            const rendererId = `${formId}.${fieldPath}`;

            return (
              <FieldHostRenderer
                key={`${struct}-${rendererId}`}
                rendererId={rendererId}
                fieldPath={fieldPath}
                fieldReference={fieldReference}
                parentPath={parentPath}
              />
            );
          }
        })}
      </div>
    );
  }
}
