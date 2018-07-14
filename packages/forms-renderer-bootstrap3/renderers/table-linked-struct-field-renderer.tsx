import { h } from 'preact';
import { LinkedStructRendererProps } from '@de-re-crud/forms/models/renderers';
import createCssClass from '@de-re-crud/forms/utils/create-css-class';
import Bootstrap3LabelRenderer from './label-renderer';
import './table-linked-struct-field-renderer.css';
import Bootstrap3ButtonRenderer from './button-renderer';

const cssName = 'bootstrap3-table-linked-struct-renderer';

const Bootstrap3TableLinkedStructFieldRenderer = ({
  label,
  required,
  headers,
  value,
  valueErrorIndicators,
  onAdd,
  onEdit,
  onRemove
}: LinkedStructRendererProps) => {
  const rows = [];

  value.forEach((column, index) => {
    rows.push(
      <tr className={valueErrorIndicators[index] && 'danger'}>
        {column.map(x => <td>{x || ' '}</td>)}
        <td>
          <div className={createCssClass(cssName, 'row', 'actions')}>
            <i
              class="glyphicon glyphicon-pencil"
              title="Edit Item"
              onClick={() => onEdit(index)}
            />
            <span>&nbsp;</span>
            <i
              class="glyphicon glyphicon-trash"
              title="Remove Item"
              onClick={() => onRemove(index)}
            />
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className={createCssClass(cssName)}>
      <div className={createCssClass(cssName, 'controls')}>
        <Bootstrap3LabelRenderer label={label} fieldRequired={required} />
        <Bootstrap3ButtonRenderer
          classes="btn btn-sm btn-default"
          text="Add"
          onClick={onAdd}
        />
      </div>
      <table className="table table-bordered table-condensed">
        <thead>
          <tr>
            {headers.map(header => <th key={header}>{header}</th>)}
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {!rows.length ? (
            <tr>
              <td colSpan={100}>None</td>
            </tr>
          ) : (
            rows
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Bootstrap3TableLinkedStructFieldRenderer;
