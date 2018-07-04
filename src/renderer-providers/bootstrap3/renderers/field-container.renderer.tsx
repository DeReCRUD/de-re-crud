import { h } from 'preact';
import { FieldContainerRendererProps } from '../../../core/models/renderers';

const Bootstrap3FieldContainerRenderer = ({
  field,
  children
}: FieldContainerRendererProps) => (
  <div className="form-group">{children}</div>
);

export default Bootstrap3FieldContainerRenderer;
