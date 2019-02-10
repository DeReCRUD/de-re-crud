import { h } from 'preact';
import BaseComponent from '../../base-component';
import {
  IInternalBlock,
  IInternalBlockReference,
  IInternalFieldReference,
  IInternalStamp,
  IInternalSchema,
} from '../../internal-schema';
import { IBlockRow } from '../../models/renderers';
import { DEFAULT_FIELD_WIDTH } from '../../models/schema';
import formPathToValue from '../../utils/form-path-to-value';
import FieldHostRenderer from '../field-host-renderer';
import StampHostRenderer from '../stamp-host-renderer';
import { IBlockHostRendererProps } from './block-host-renderer.props';

export default class BlockHostRenderer extends BaseComponent<
  IBlockHostRendererProps
> {
  public render() {
    const {
      schema,
      formId,
      struct,
      block: blockName,
      path: parentPath,
      formValue,
      renderers,
    } = this.props;

    const block = schema.blocks.get(struct).get(blockName);

    if (!block.condition(formValue)) {
      return null;
    }

    let path = `${block.name}`;

    if (parentPath) {
      path = `${parentPath}.${path}`;
    }

    const rendererId = `${formId}.block.${path}`;
    const BlockContainerRenderer = renderers.blockContainer;

    const rows = this.createRows(schema, block, true);

    return <BlockContainerRenderer rendererId={rendererId} rows={rows} />;
  }

  private createRows(
    schema: IInternalSchema,
    block: IInternalBlock,
    root: boolean = false,
  ) {
    const { formValue, path: parentPath } = this.props;

    const rows = [];

    if (!root && !block.condition(formValue)) {
      return rows;
    }

    let nextRow: IBlockRow;

    block.items.forEach((item) => {
      let width = DEFAULT_FIELD_WIDTH;

      const blockReference = item as IInternalBlockReference;
      if (blockReference.block) {
        const itemBlock = schema.blocks
          .get(block.struct)
          .get(blockReference.block);

        rows.push(...this.createRows(schema, itemBlock));
        return;
      }

      const fieldReference = item as IInternalFieldReference;
      if (fieldReference.field) {
        const parentValue = formPathToValue(formValue, parentPath);
        const field = schema.fields.get(block.struct).get(fieldReference.field);

        if (!fieldReference.condition(parentValue, formValue)) {
          return;
        }

        if (fieldReference.hints.width) {
          width = fieldReference.hints.width;
        }

        width = fieldReference.hints.width || field.hints.width;
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
        renderedItem: this.renderItem(item as
          | IInternalFieldReference
          | IInternalStamp),
        width,
      });
    });

    return rows;
  }

  private renderItem(item: IInternalFieldReference | IInternalStamp) {
    const { formId, struct, path: parentPath } = this.props;

    const stamp = item as IInternalStamp;

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

    const fieldReference = item as IInternalFieldReference;
    if (fieldReference.field) {
      const fieldName = fieldReference.field;
      const fieldPath = parentPath ? `${parentPath}.${fieldName}` : fieldName;
      const rendererId = `${formId}.${fieldPath}`;

      return (
        <FieldHostRenderer
          key={`${struct}-${rendererId}`}
          rendererId={rendererId}
          struct={struct}
          fieldPath={fieldPath}
          fieldReference={fieldReference}
          parentPath={parentPath}
        />
      );
    }
  }
}
