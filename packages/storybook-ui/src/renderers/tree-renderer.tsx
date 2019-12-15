import {
  createCssClass,
  h,
  ITableLinkedStructFieldRenderer,
} from '@de-re-crud/ui';
import {
  Bootstrap4ButtonRenderer,
  Bootstrap4LabelRenderer,
} from '@de-re-crud/theme-bootstrap4';

const cssName = 'tree-renderer';

const TreeRenderer = ({
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
  hints,
  renderChildField,
}: ITableLinkedStructFieldRenderer) => {
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
      <tr>
        <td colSpan={columns.length + 1}>
          {renderChildField(index, (hints as any).childKey)}
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
            onClick={() => onAdd(undefined, false)}
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
export default TreeRenderer;
