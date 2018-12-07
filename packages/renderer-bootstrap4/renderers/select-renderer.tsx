import { ISelectListFieldRenderer } from '@de-re-crud/core/models/renderers';
import combineCssClasses from '@de-re-crud/core/utils/combine-css-classes';
import { h } from 'preact';
import Bootstrap4LabelRenderer from './label-renderer';

export type Bootstrap4SelectRendererProps = ISelectListFieldRenderer & {};

const Bootstrap4SelectRenderer = ({
  label,
  errors,
  multiSelect,
  options,
  onFocus,
  onBlur,
  onChange,
  required,
  readOnly,
}: Bootstrap4SelectRendererProps) => (
  <div className="bootstrap4-select-renderer">
    <Bootstrap4LabelRenderer fieldRequired={required}>
      {label}
    </Bootstrap4LabelRenderer>
    <select
      className={combineCssClasses(
        'custom-select',
        errors.length && 'is-invalid',
      )}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      multiple={multiSelect}
      disabled={readOnly}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          selected={option.selected}
        >
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Bootstrap4SelectRenderer;
