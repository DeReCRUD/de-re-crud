import { IInlinedLinkedStructRenderer } from '@de-re-crud/core/models/renderers';
import createCssClass from '@de-re-crud/core/utils/create-css-class';
import Bootstrap3ButtonRenderer from '@de-re-crud/renderer-bootstrap3/renderers/button-renderer';
import Bootstrap3LabelRenderer from '@de-re-crud/renderer-bootstrap3/renderers/label-renderer';
import { h } from 'preact';
import './inline-linked-struct-field-renderer.css';

const cssName = 'bootstrap3-inline-linked-struct-renderer';

const Bootstrap3InlineLinkedStructFieldRenderer = ({
  label,
  required,
  busy,
  renderedItems,
  canAdd,
  canRemove,
  onAdd,
  onRemove
}: IInlinedLinkedStructRenderer) => {
  const rows = renderedItems.map((item, index) => {
    const removeButtonVisible = canRemove(index);

    return (
      <div className={createCssClass(cssName, 'item')}>
        {item}
        {removeButtonVisible && (
          <Bootstrap3ButtonRenderer
            classes="btn btn-sm btn-danger"
            text="Remove"
            onClick={() => onRemove(index)}
          />
        )}
        {removeButtonVisible && <hr />}
      </div>
    );
  });

  return (
    <div className={createCssClass(cssName)}>
      <div className={createCssClass(cssName, 'controls')}>
        <Bootstrap3LabelRenderer fieldRequired={required}>
          {label}
        </Bootstrap3LabelRenderer>{' '}
        {canAdd() && (
          <Bootstrap3ButtonRenderer
            classes="btn btn-sm btn-default"
            text="Add"
            onClick={onAdd}
            disabled={busy}
          />
        )}
      </div>
      <div className={createCssClass(cssName, 'items')}>
        {!rows.length ? <span>None</span> : rows}
      </div>
    </div>
  );
};

export default Bootstrap3InlineLinkedStructFieldRenderer;
