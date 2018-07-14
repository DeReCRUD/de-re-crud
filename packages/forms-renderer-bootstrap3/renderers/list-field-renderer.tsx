import { h } from 'preact';
import { ListFieldRendererProps } from '@de-re-crud/forms/models/renderers';
import Bootstrap3SelectRenderer from './select-renderer';

const Bootstrap3ListFieldRenderer = (props: ListFieldRendererProps) => (
  <div className="bootstrap3-list-renderer">
    <Bootstrap3SelectRenderer {...props} />
  </div>
);

export default Bootstrap3ListFieldRenderer;
