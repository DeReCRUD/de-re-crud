import { h, ComponentChild, combineCssClasses } from '@de-re-crud/ui';

export interface IBootstrap4LabelRenderer {
  htmlFor?: string;
  className?: string;
  children: ComponentChild;
  fieldRequired: boolean;
}

const Bootstrap4LabelRenderer = ({
  htmlFor,
  className,
  children,
  fieldRequired,
}: IBootstrap4LabelRenderer) => (
  <label
    for={htmlFor}
    className={combineCssClasses('bootstrap4-label-renderer', className)}
  >
    {children}
    {fieldRequired ? <span className="required text-danger"> *</span> : null}
  </label>
);

export default Bootstrap4LabelRenderer;
