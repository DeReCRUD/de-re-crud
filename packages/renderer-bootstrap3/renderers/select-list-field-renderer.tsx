import { ISelectListFieldRenderer } from '@de-re-crud/core/models/renderers';
import { h } from 'preact';
import Bootstrap3SelectRenderer from './select-renderer';

const Bootstrap3SelectListFieldRenderer = (props: ISelectListFieldRenderer) => (
  <div className="bootstrap3-select-list-renderer">
    <Bootstrap3SelectRenderer {...props} />
  </div>
);

export default Bootstrap3SelectListFieldRenderer;
