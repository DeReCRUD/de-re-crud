import { ISelectListFieldRenderer } from '@de-re-crud/core/models/renderers';
import { h } from 'preact';
import Bootstrap3LabelRenderer from './label-renderer';

export type Bootstrap3SelectRendererProps = ISelectListFieldRenderer & {};

const Bootstrap3SelectRenderer = ({
  label,
  multiSelect,
  options,
  onFocus,
  onBlur,
  onChange,
  required,
  readOnly
}: Bootstrap3SelectRendererProps) => (
  <div className="bootstrap3-select-renderer">
    <Bootstrap3LabelRenderer fieldRequired={required}>
      {label}
    </Bootstrap3LabelRenderer>
    <select
      className="form-control"
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

export default Bootstrap3SelectRenderer;
