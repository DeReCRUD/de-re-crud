import { h, render } from 'preact';
import { InlinedLinkedStructRendererProps } from '@de-re-crud/forms/models/renderers';
import createCssClass from '@de-re-crud/forms/utils/create-css-class';
import Bootstrap3ButtonRenderer from '@de-re-crud/forms-renderer-bootstrap3/renderers/button-renderer';
import Bootstrap3LabelRenderer from '@de-re-crud/forms-renderer-bootstrap3/renderers/label-renderer';

const cssName = 'bootstrap3-inline-linked-struct-renderer';

const Bootstrap3InlineLinkedStructFieldRenderer = ({
  label,
  required,
  renderedItems,
  onAdd,
  onRemove
}: InlinedLinkedStructRendererProps) => (
  <div className={createCssClass(cssName)}>
    <Bootstrap3LabelRenderer label={label} fieldRequired={required} />
    <div className={createCssClass(cssName, 'controls')}>
      <Bootstrap3ButtonRenderer
        classes="btn btn-sm btn-default"
        text="Add"
        onClick={onAdd}
      />
    </div>
    <div className={createCssClass(cssName, 'items')}>
      {renderedItems.map((item, index) => (
        <div className={createCssClass(cssName, 'item')}>
          {item}
          <Bootstrap3ButtonRenderer
            classes="btn btn-sm btn-danger"
            text="Remove"
            onClick={() => onRemove(index)}
          />
        </div>
      ))}
    </div>
  </div>
);

export default Bootstrap3InlineLinkedStructFieldRenderer;
