import { h } from 'preact';
import BaseComponent from '../../base-component';
import { IBlockRow } from '../../models/renderers';
import {
  DEFAULT_FIELD_WIDTH,
  IFieldReference,
  IStamp
} from '../../models/schema';
import FieldHostRenderer from '../field-host-renderer';
import StampHostRenderer from '../stamp-host-renderer';
import { IBlockHostRendererProps } from './block-host-renderer.props';

export default class BlockHostRenderer extends BaseComponent<
  IBlockHostRendererProps
> {
  public render() {
    const {
      formId,
      block,
      path: parentPath,
      formValue,
      rendererOptions
    } = this.props;

    if (!block.condition(formValue)) {
      return null;
    }

    let path = `block.${block.name}`;

    if (parentPath) {
      path = `${parentPath}.{render`;
    }

    const rendererId = `${formId}.${path}`;
    const BlockContainerRenderer = rendererOptions.components.blockContainer;

    const rows = block.items.map((item) => {
      let width = DEFAULT_FIELD_WIDTH;

      const fieldReference = item as IFieldReference;
      if (fieldReference.field) {
        width = fieldReference.field.hints.width;
      }

      const row: IBlockRow = {
        cells: [
          {
            renderedItem: this.renderField(item),
            width
          }
        ]
      };

      return row;
    });

    return <BlockContainerRenderer rendererId={rendererId} rows={rows} />;
  }

  private renderField(item: IFieldReference | IStamp) {
    const { formId, struct, path: parentPath } = this.props;

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
      const fieldPath = parentPath ? `${parentPath}.${fieldName}` : fieldName;

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
  }
}
