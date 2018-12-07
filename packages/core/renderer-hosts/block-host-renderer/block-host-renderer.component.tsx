import { h } from 'preact';
import BaseComponent from '../../base-component';
import { IBlockRow } from '../../models/renderers';
import {
  DEFAULT_FIELD_WIDTH,
  IBlock,
  IBlockReference,
  IFieldReference,
  IStamp,
} from '../../models/schema';
import formPathToValue from '../../utils/form-path-to-value';
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
      rendererOptions,
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

    const rows = this.createRows(block, true);

    return <BlockContainerRenderer rendererId={rendererId} rows={rows} />;
  }

  private createRows(block: IBlock, root: boolean = false) {
    const { formValue, path: parentPath } = this.props;

    const rows = [];

    if (!root && !block.condition(formValue)) {
      return rows;
    }

    let nextRow: IBlockRow;

    block.items.forEach((item) => {
      let width = DEFAULT_FIELD_WIDTH;

      const blockReference = item as IBlockReference;
      if (blockReference.block) {
        rows.push(...this.createRows(blockReference.block));
        return;
      }

      const fieldReference = item as IFieldReference;
      if (fieldReference.field) {
        const parentValue = formPathToValue(formValue, parentPath);

        if (!fieldReference.condition(parentValue, formValue)) {
          return;
        }

        width = fieldReference.hints.width || fieldReference.field.hints.width;
      }

      if (block.hints.layout !== 'horizontal') {
        nextRow = null;
      }

      if (!nextRow) {
        nextRow = {
          cells: [],
        };

        rows.push(nextRow);
      }

      nextRow.cells.push({
        renderedItem: this.renderItem(item as IFieldReference | IStamp),
        width,
      });
    });

    return rows;
  }

  private renderItem(item: IFieldReference | IStamp) {
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
