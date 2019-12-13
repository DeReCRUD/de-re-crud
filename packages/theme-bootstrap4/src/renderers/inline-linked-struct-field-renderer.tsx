import {
  h,
  IInlineLinkedStructFieldRenderer,
  createCssClass,
} from '@de-re-crud/ui';
import Bootstrap4ButtonRenderer from './button-renderer';
import Bootstrap4LabelRenderer from './label-renderer';

const cssName = 'bootstrap4-inline-linked-struct-renderer';

const Bootstrap4InlineLinkedStructFieldRenderer = ({
  label,
  required,
  disabled,
  renderedItems,
  disabledRenderedItems,
  canAdd,
  canRemove,
  onAdd,
  onRemove,
}: IInlineLinkedStructFieldRenderer) => {
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
            disabled={disabled || disabledRenderedItems[index]}
          />
        )}
        {removeButtonVisible && <hr />}
      </div>
    );
  });

  console.log(label);

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
            onClick={() => onAdd()}
            disabled={disabled}
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
