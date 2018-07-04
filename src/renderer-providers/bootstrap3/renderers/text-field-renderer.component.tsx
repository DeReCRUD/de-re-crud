import { h } from 'preact';
import { FieldRendererProps } from '../../../core/models/renderers';

const Bootstrap3TextFieldRenderer = ({
  fieldType,
  fieldName,
  label,
  onFocus,
  onBlur,
  onChange
}: FieldRendererProps) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        class="form-control"
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onChange}
      />
    </div>
  );
};

export default Bootstrap3TextFieldRenderer;
