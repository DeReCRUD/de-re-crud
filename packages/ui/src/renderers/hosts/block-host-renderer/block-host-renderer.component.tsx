import {
  getValueForPath,
  IBlock,
  IBlockReference,
  IFieldReference,
  IStamp,
  ISchema,
  DEFAULT_FIELD_WIDTH,
  InternalSchemaHelper,
} from '@de-re-crud/core';
import { h } from 'preact';
import BaseComponent from '../../base-component';
import FieldHostRenderer from '../field-host-renderer';
import StampHostRenderer from '../stamp-host-renderer';
import { IBlockHostRendererProps } from './block-host-renderer.props';
import { IBlockRow } from '../..';

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

    const block = InternalSchemaHelper.getBlock(schema, struct, blockName);
    const customHints = block.hints.custom;

    let path = `${block.name}`;

    if (parentPath) {
      path = `${parentPath}.${path}`;
    }

    const parentValue = parentPath
      ? getValueForPath(formValue, parentPath)
      : formValue;

    if (!block.condition({ path, formValue, parentValue })) {
      return null;
    }

    const rendererId = `${formId}.block.${path}`;
    const BlockContainerRenderer = renderers.blockContainer;

    const rows = this.createRows(schema, block, true);

    return (
      <BlockContainerRenderer
        formId={formId}
        rendererId={rendererId}
        rows={rows}
        hints={customHints}
      />
    );
  }

  private createRows(schema: ISchema, block: IBlock, root: boolean = false) {
    const { formValue, path: parentPath } = this.props;

    const rows = [];

    let path = `${block.name}`;

    if (parentPath) {
      path = `${parentPath}.${path}`;
    }

    const parentValue = parentPath
      ? getValueForPath(formValue, parentPath)
      : formValue;

    if (!root && !block.condition({ path, parentValue, formValue })) {
      return rows;
    }

    let nextRow: IBlockRow;

    block.references.forEach((reference) => {
      let width = DEFAULT_FIELD_WIDTH;

      const blockReference = reference as IBlockReference;
      if (blockReference.block) {
        const itemBlock = schema.blocks
          .get(block.struct)
          .get(blockReference.block);

        rows.push(...this.createRows(schema, itemBlock));
        return;
      }

      let itemPath: string;

      const fieldReference = reference as IFieldReference;
      if (fieldReference.field) {
        const field = schema.fields.get(block.struct).get(fieldReference.field);

        itemPath = `${field.name}`;
        if (parentPath) {
          itemPath = `${parentPath}.${itemPath}`;
        }

        if (
          !fieldReference.condition({ path: itemPath, parentValue, formValue })
        ) {
          return;
        }

        if (fieldReference.hints.width) {
          ({ width } = fieldReference.hints);
        }

        width = fieldReference.hints.width || field.hints.width;
      }

      const stamp = reference as IStamp;
      if (stamp.text) {
        itemPath = `stamp.${stamp.blockInstance}`;
        if (parentPath) {
          itemPath = `${parentPath}.${path}`;
        }

        if (!stamp.condition({ path: itemPath, parentValue, formValue })) {
          return;
        }
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
        renderedItem: this.renderItem(
          reference as IFieldReference | IStamp,
          itemPath,
        ),
        width,
      });
    });

    return rows;
  }

  private renderItem(item: IFieldReference | IStamp, itemPath: string) {
    const { formId, struct, path: parentPath } = this.props;

    const stamp = item as IStamp;

    if (stamp.text) {
      const rendererId = `${formId}.${itemPath}`;

      return (
        <StampHostRenderer
          key={`${struct}-${rendererId}`}
          formId={formId}
          rendererId={rendererId}
          stamp={stamp}
          parentPath={parentPath}
        />
      );
    }

    const fieldReference = item as IFieldReference;
    if (fieldReference.field) {
      const rendererId = `${formId}.${itemPath}`;

      return (
        <FieldHostRenderer
          key={`${struct}-${rendererId}`}
          formId={formId}
          rendererId={rendererId}
          struct={struct}
          fieldPath={itemPath}
          fieldReference={fieldReference}
          parentPath={parentPath}
        />
      );
    }

    return null;
  }
}
