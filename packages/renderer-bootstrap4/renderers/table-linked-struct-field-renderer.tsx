import { ITableLinkedStructRenderer } from '@de-re-crud/core/models/renderers';
import createCssClass from '@de-re-crud/core/utils/create-css-class';
import { h } from 'preact';
import Bootstrap4ButtonRenderer from './button-renderer';
import Bootstrap4LabelRenderer from './label-renderer';

const cssName = 'bootstrap4-table-linked-struct-renderer';

const Bootstrap4TableLinkedStructFieldRenderer = ({
  label,
  required,
  headers,
  readOnly,
  value,
  valueErrorIndicators,
  readOnlyValues,
  canAdd,
  canRemove,
  onAdd,
  onEdit,
  onRemove,
  addLabel,
  editLabel,
  removeLabel,
  showActionSeparator,
}: ITableLinkedStructRenderer) => {
  const rows = [];

  value.forEach((columns, index) => {
    const removeButtonVisible = canRemove(index);

    rows.push(
      <tr className={valueErrorIndicators[index] && 'table-danger'}>
        {columns.map((x) => (
          <td>{x || ' '}</td>
        ))}
        <td>
          <div className="text-nowrap " + {createCssClass(cssName, 'row', 'actions')}>
            <Bootstrap4ButtonRenderer
              classes="btn btn-link"
              text=editLabel
              onClick={() => onEdit(index)}
              disabled={readOnlyValues[index]}
            />
            {showActionSeparator && <span>|</span>}
            {removeButtonVisible && (
              <Bootstrap4ButtonRenderer
                classes="btn btn-link"
                text=removeLabel
                onClick={() => onRemove(index)}
                disabled={readOnly || readOnlyValues[index]}
              />
            )}
          </div>
        </td>
      </tr>,
    );
  });

  return (
    <div className={createCssClass(cssName)}>
      <Bootstrap4LabelRenderer fieldRequired={required}>
	    {label}
	  </Bootstrap4LabelRenderer>{' '}
      <table className="table table-bordered table-sm mb-1">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
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
      <div className={createCssClass(cssName, 'controls')}>
        {canAdd() && (
          <Bootstrap4ButtonRenderer
            classes="btn btn-link"
            text=addLabel
            onClick={onAdd}
            disabled={readOnly}
          />
        )}
      </div>
    </div>
  );
};

export default Bootstrap4TableLinkedStructFieldRenderer;
