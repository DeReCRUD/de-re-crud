import { h, ITableLinkedStructRenderer, createCssClass } from '@de-re-crud/ui';
import Bootstrap4ButtonRenderer from './button-renderer';
import Bootstrap4LabelRenderer from './label-renderer';

const cssName = 'bootstrap4-table-linked-struct-renderer';

const Bootstrap4TableLinkedStructFieldRenderer = ({
  label,
  required,
  headers,
  disabled,
  value,
  valueErrorIndicators,
  disabledValues,
  canAdd,
  canRemove,
  onAdd,
  onEdit,
  onRemove,
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
          <div className={createCssClass(cssName, 'row', 'actions')}>
            <Bootstrap4ButtonRenderer
              classes="btn btn-link"
              text="Edit"
              onClick={() => onEdit(index)}
              disabled={disabledValues[index]}
            />
            {removeButtonVisible && <span>|</span>}
            {removeButtonVisible && (
              <Bootstrap4ButtonRenderer
                classes="btn btn-link"
                text="Remove"
                onClick={() => onRemove(index)}
                disabled={disabled || disabledValues[index]}
              />
            )}
          </div>
        </td>
      </tr>,
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
            disabled={disabled}
          />
        )}
      </div>
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            {headers.map((header) => (
              <th>{header}</th>
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
    </div>
  );
};

export default Bootstrap4TableLinkedStructFieldRenderer;
