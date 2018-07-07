import { h } from 'preact';
import { FieldRendererProps } from '../../../core/models/renderers';
import Bootstrap3LabelRenderer from './label-renderer.component';

const Bootstrap3BooleanFieldRenderer = ({
  label,
  required
}: FieldRendererProps) => {
  const checkbox = (
    <span>
      <input type="checkbox" />
      {label}
    </span>
  );

  return (
    <div className="checkbox bootstrap3-boolean-field-renderer">
      <Bootstrap3LabelRenderer label={checkbox} fieldRequired={required} />
    </div>
  );
};

export default Bootstrap3BooleanFieldRenderer;
