import { h } from 'preact';
import { TextFieldRendererProps } from '../../../core/models/renderers';
import Bootstrap3LabelRenderer from './label-renderer.component';

const Bootstrap3TextFieldRenderer = ({
  fieldType,
  fieldName,
  label,
  onFocus,
  onBlur,
  onChange,
  minLength,
  maxLength,
  required
}: TextFieldRendererProps) => {
  return (
    <div>
      <Bootstrap3LabelRenderer label={label} fieldRequired={required} />
      <input
        type="text"
        class="form-control"
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onChange}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
    </div>
  );
};

export default Bootstrap3TextFieldRenderer;
