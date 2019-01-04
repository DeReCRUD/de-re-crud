import { IMultiSelectListFieldRenderer } from '@de-re-crud/core/models/renderers';
import { h } from 'preact';
import Bootstrap3SelectRenderer from './select-renderer';

const Bootstrap3MultiSelectListFieldRenderer = (
  props: IMultiSelectListFieldRenderer,
) => (
  <div className="bootstrap3-multi-select-list-renderer">
    <Bootstrap3SelectRenderer {...props} multiSelect={true} />
  </div>
);

export default Bootstrap3MultiSelectListFieldRenderer;
