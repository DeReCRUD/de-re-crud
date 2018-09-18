import { ISelectListFieldRenderer } from '@de-re-crud/core/models/renderers';
import { h } from 'preact';
import Bootstrap4SelectRenderer from './select-renderer';

const Bootstrap4ListFieldRenderer = (props: ISelectListFieldRenderer) => (
  <div className="bootstrap4-list-renderer">
    <Bootstrap4SelectRenderer {...props} />
  </div>
);

export default Bootstrap4ListFieldRenderer;
