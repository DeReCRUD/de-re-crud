import { h } from "preact";
import "./label-renderer.css";

export type Bootstrap3LabelRendererProps = {
  label: string | JSX.Element;
  fieldRequired: boolean;
};

const Bootstrap3LabelRenderer = ({
  label,
  fieldRequired
}: Bootstrap3LabelRendererProps) => (
  <label class="bootstrap3-label-renderer">
    {label}
    {fieldRequired ? <span className="required"> *</span> : null}
  </label>
);

export default Bootstrap3LabelRenderer;
