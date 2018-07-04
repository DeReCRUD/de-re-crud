import { h } from 'preact';
import './label-renderer';

export type Bootstrap3LabelRendererProps = {
  label: string;
  fieldRequired: boolean;
};

const Bootstrap3LabelRenderer = ({
  label,
  fieldRequired
}: Bootstrap3LabelRendererProps) => (
  <label>
    {label}
    <span className="required"> *</span>
  </label>
);

export default Bootstrap3LabelRenderer;
