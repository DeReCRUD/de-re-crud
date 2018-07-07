import { h } from 'preact';
import { FieldContainerRendererProps } from '../../../core/models/renderers';

const Bootstrap3FieldContainerRenderer = ({
  children
}: FieldContainerRendererProps) => (
  <div className="form-group bootstrap3-field-container-renderer">{children}</div>
);

export default Bootstrap3FieldContainerRenderer;
