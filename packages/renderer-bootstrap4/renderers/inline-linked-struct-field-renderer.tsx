import { IInlinedLinkedStructRenderer } from '@de-re-crud/core/models/renderers';
import createCssClass from '@de-re-crud/core/utils/create-css-class';
import Bootstrap4ButtonRenderer from '@de-re-crud/renderer-bootstrap4/renderers/button-renderer';
import Bootstrap4LabelRenderer from '@de-re-crud/renderer-bootstrap4/renderers/label-renderer';
import { h } from 'preact';

const cssName = 'bootstrap4-inline-linked-struct-renderer';

const Bootstrap4InlineLinkedStructFieldRenderer = ({
  label,
  required,
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
          <Bootstrap4ButtonRenderer
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
        <Bootstrap4LabelRenderer fieldRequired={required}>
          {label}
        </Bootstrap4LabelRenderer>{' '}
        {canAdd() && (
          <Bootstrap4ButtonRenderer
            classes="btn btn-sm btn-secondary"
            text="Add"
            onClick={onAdd}
          />
        )}
      </div>
      <div className={createCssClass(cssName, 'items')}>
        {!rows.length ? <span>None</span> : rows}
      </div>
    </div>
  );
};

export default Bootstrap4InlineLinkedStructFieldRenderer;
