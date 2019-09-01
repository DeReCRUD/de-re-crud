import { IMultiSelectListFieldRenderer } from '@de-re-crud/core/models/renderers';
import { h } from 'preact';
import Bootstrap4SelectRenderer from './select-renderer';

const Bootstrap4MultiSelectListFieldRenderer = (
  props: IMultiSelectListFieldRenderer,
) => (
  <div className="bootstrap4-multi-select-list-renderer">
    <Bootstrap4SelectRenderer {...props} multiSelect />
  </div>
);

export default Bootstrap4MultiSelectListFieldRenderer;
