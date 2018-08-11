import { h } from 'preact';
import './label-renderer.css';

export interface IBootstrap3LabelRenderer {
  label: string | JSX.Element;
  fieldRequired: boolean;
}

const Bootstrap3LabelRenderer = ({
  label,
  fieldRequired
}: IBootstrap3LabelRenderer) => (
  <label class="bootstrap3-label-renderer">
    {label}
    {fieldRequired ? <span className="required"> *</span> : null}
  </label>
);

export default Bootstrap3LabelRenderer;
