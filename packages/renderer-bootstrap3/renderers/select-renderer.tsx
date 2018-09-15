import { IListFieldRenderer } from '@de-re-crud/core/models/renderers';
import { h } from 'preact';
import Bootstrap3LabelRenderer from './label-renderer';

export type Bootstrap3SelectRendererProps = IListFieldRenderer & {};

const Bootstrap3SelectRenderer = ({
  label,
  multiSelect,
  options,
  onFocus,
  onBlur,
  onChange,
  required
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
