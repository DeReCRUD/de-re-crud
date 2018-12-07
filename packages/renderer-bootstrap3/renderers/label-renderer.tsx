import { h } from 'preact';

type Children = string | JSX.Element;

export interface IBootstrap3LabelRenderer {
  children: Children | Children[];
  fieldRequired: boolean;
}

const Bootstrap3LabelRenderer = ({
  children,
  fieldRequired,
}: IBootstrap3LabelRenderer) => (
  <label class="bootstrap3-label-renderer">
    {children}
    {fieldRequired ? <span className="required text-danger"> *</span> : null}
  </label>
);

export default Bootstrap3LabelRenderer;
