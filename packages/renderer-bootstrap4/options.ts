import { IRendererOptions } from '@de-re-crud/core/models/renderer-options';
import Bootstrap4BlockContainerRenderer from './renderers/block-container-renderer';
import Bootstrap4BooleanFieldRenderer from './renderers/boolean-field-renderer';
import Bootstrap4ButtonRenderer from './renderers/button-renderer';
import Bootstrap4FieldContainerRenderer from './renderers/field-container-renderer';
import Bootstrap4InlineLinkedStructFieldRenderer from './renderers/inline-linked-struct-field-renderer';
import Bootstrap4InputFieldRenderer from './renderers/input-field-renderer';
import Bootstrap4ListFieldRenderer from './renderers/list-field-renderer';
import Bootstrap4RadioListFieldRenderer from './renderers/radio-list-field-renderer';
import Bootstrap4StampRenderer from './renderers/stamp-renderer';
import Bootstrap4TableLinkedStructFieldRenderer from './renderers/table-linked-struct-field-renderer';

const Bootstrap4RendererOptions: IRendererOptions = {
  components: {
    blockContainer: Bootstrap4BlockContainerRenderer,
    booleanField: Bootstrap4BooleanFieldRenderer,
    button: Bootstrap4ButtonRenderer,
    dateField: Bootstrap4InputFieldRenderer,
    derivedField: Bootstrap4InputFieldRenderer,
    estimateField: Bootstrap4InputFieldRenderer,
    fieldContainer: Bootstrap4FieldContainerRenderer,
    foreignKeyField: Bootstrap4ListFieldRenderer,
    inlineLinkedStructField: Bootstrap4InlineLinkedStructFieldRenderer,
    integerField: Bootstrap4InputFieldRenderer,
    keywordField: Bootstrap4InputFieldRenderer,
    moneyField: Bootstrap4InputFieldRenderer,
    percentField: Bootstrap4InputFieldRenderer,
    radioListField: Bootstrap4RadioListFieldRenderer,
    selectListField: Bootstrap4ListFieldRenderer,
    stamp: Bootstrap4StampRenderer,
    tableLinkedStructField: Bootstrap4TableLinkedStructFieldRenderer,
    textField: Bootstrap4InputFieldRenderer
  },
  formClassName: 'de-re-crud-form-bootstrap4'
};

export default Bootstrap4RendererOptions;
