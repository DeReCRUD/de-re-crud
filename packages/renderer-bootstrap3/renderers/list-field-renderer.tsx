import { IListFieldRenderer } from '@de-re-crud/core/models/renderers';
import { h } from 'preact';
import Bootstrap3SelectRenderer from './select-renderer';

const Bootstrap3ListFieldRenderer = (props: IListFieldRenderer) => (
  <div className="bootstrap3-list-renderer">
    <Bootstrap3SelectRenderer {...props} />
  </div>
);

export default Bootstrap3ListFieldRenderer;
