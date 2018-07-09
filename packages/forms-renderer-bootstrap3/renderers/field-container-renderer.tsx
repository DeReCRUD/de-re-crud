import { h } from 'preact';
import { FieldContainerRendererProps } from '@de-re-crud/forms/models/renderers';

const Bootstrap3FieldContainerRenderer = ({
  fieldDescription,
  children
}: FieldContainerRendererProps) => (
  <div className="form-group bootstrap3-field-container-renderer">
    {children}
    {fieldDescription && <span className="help-block">{fieldDescription}</span>}
  </div>
);

export default Bootstrap3FieldContainerRenderer;
