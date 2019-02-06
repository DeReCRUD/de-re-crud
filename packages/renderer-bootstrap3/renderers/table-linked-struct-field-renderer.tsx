import { ITableLinkedStructRenderer } from '@de-re-crud/core/models/renderers';
import combineCssClasses from '@de-re-crud/core/utils/combine-css-classes';
import createCssClass from '@de-re-crud/core/utils/create-css-class';
import { h } from 'preact';
import Bootstrap3ButtonRenderer from './button-renderer';
import Bootstrap3LabelRenderer from './label-renderer';
import './table-linked-struct-field-renderer.css';

const cssName = 'bootstrap3-table-linked-struct-renderer';

const Bootstrap3TableLinkedStructFieldRenderer = ({
  label,
  required,
  headers,
  busy,
  value,
  valueErrorIndicators,
  busyValues,
  canAdd,
  canRemove,
  onAdd,
  onEdit,
  onRemove,
}: ITableLinkedStructRenderer) => {
  const rows = [];

  value.forEach((columns, index) => {
    const removeButtonVisible = canRemove(index);
    const editIconDisabled = busyValues[index];
    const removeIconDisabled = editIconDisabled || busyValues[index];

    rows.push(
      <tr className={valueErrorIndicators[index] && 'danger'}>
        {columns.map((x) => (
          <td>{x || ' '}</td>
        ))}
        <td>
          <div className={createCssClass(cssName, 'row', 'actions')}>
            <i
              class={combineCssClasses(
                'glyphicon glyphicon-pencil',
                editIconDisabled && 'disabled',
              )}
              title="Edit Item"
              onClick={() => !editIconDisabled && onEdit(index)}
            />
            {removeButtonVisible && <span>&nbsp;</span>}
            {removeButtonVisible && (
              <i
                class={combineCssClasses(
                  'glyphicon glyphicon-trash',
                  removeIconDisabled && 'disabled',
                )}
                title="Remove Item"
                onClick={() => !removeIconDisabled && onRemove(index)}
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
        <Bootstrap3LabelRenderer fieldRequired={required}>
          {label}
        </Bootstrap3LabelRenderer>
        {canAdd() && (
          <Bootstrap3ButtonRenderer
            classes="btn btn-sm btn-default"
            text="Add"
            onClick={onAdd}
            disabled={busy}
          />
        )}
      </div>
      <table className="table table-bordered table-condensed">
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

export default Bootstrap3TableLinkedStructFieldRenderer;
