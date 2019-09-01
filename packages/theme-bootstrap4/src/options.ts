import { IRendererOptions } from '@de-re-crud/ui';
import Bootstrap4BlockContainerRenderer from './renderers/block-container-renderer';
import Bootstrap4BooleanFieldRenderer from './renderers/boolean-field-renderer';
import Bootstrap4ButtonRenderer from './renderers/button-renderer';
import Bootstrap4FieldContainerRenderer from './renderers/field-container-renderer';
import Bootstrap4InlineLinkedStructFieldRenderer from './renderers/inline-linked-struct-field-renderer';
import Bootstrap4InputFieldRenderer from './renderers/input-field-renderer';
import Bootstrap4MultiSelectListFieldRenderer from './renderers/multi-select-list-field-renderer';
import Bootstrap4RadioListFieldRenderer from './renderers/radio-list-field-renderer';
import Bootstrap4SelectListFieldRenderer from './renderers/select-list-field-renderer';
import Bootstrap4StampRenderer from './renderers/stamp-renderer';
import Bootstrap4TableLinkedStructFieldRenderer from './renderers/table-linked-struct-field-renderer';
import Bootstrap4TextAreaFieldRenderer from './renderers/text-area-field-renderer';

const Bootstrap4RendererOptions: IRendererOptions = {
  formClassName: 'de-re-crud-form-bootstrap4',
  renderers: {
    blockContainer: Bootstrap4BlockContainerRenderer,
    booleanField: Bootstrap4BooleanFieldRenderer,
    button: Bootstrap4ButtonRenderer,
    dateField: Bootstrap4InputFieldRenderer,
    derivedField: Bootstrap4InputFieldRenderer,
    estimateField: Bootstrap4InputFieldRenderer,
    fieldContainer: Bootstrap4FieldContainerRenderer,
    foreignKeyField: Bootstrap4SelectListFieldRenderer,
    inlineLinkedStructField: Bootstrap4InlineLinkedStructFieldRenderer,
    integerField: Bootstrap4InputFieldRenderer,
    keywordField: Bootstrap4InputFieldRenderer,
    moneyField: Bootstrap4InputFieldRenderer,
    percentField: Bootstrap4InputFieldRenderer,
    radioListField: Bootstrap4RadioListFieldRenderer,
    selectListField: Bootstrap4SelectListFieldRenderer,
    multiSelectListField: Bootstrap4MultiSelectListFieldRenderer,
    stamp: Bootstrap4StampRenderer,
    tableLinkedStructField: Bootstrap4TableLinkedStructFieldRenderer,
    textField: Bootstrap4InputFieldRenderer,
    textAreaField: Bootstrap4TextAreaFieldRenderer,
  },
};

export default Bootstrap4RendererOptions;
