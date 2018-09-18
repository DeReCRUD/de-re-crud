import { IRendererOptions } from '@de-re-crud/core/models/renderer-options';
import Bootstrap4BlockContainerRenderer from '@de-re-crud/renderer-bootstrap4/renderers/block-container-renderer';
import Bootstrap4BooleanFieldRenderer from '@de-re-crud/renderer-bootstrap4/renderers/boolean-field-renderer';
import Bootstrap4ButtonRenderer from '@de-re-crud/renderer-bootstrap4/renderers/button-renderer';
import Bootstrap4FieldContainerRenderer from '@de-re-crud/renderer-bootstrap4/renderers/field-container-renderer';
import Bootstrap4InlineLinkedStructFieldRenderer from '@de-re-crud/renderer-bootstrap4/renderers/inline-linked-struct-field-renderer';
import Bootstrap4InputFieldRenderer from '@de-re-crud/renderer-bootstrap4/renderers/input-field-renderer';
import Bootstrap4ListFieldRenderer from '@de-re-crud/renderer-bootstrap4/renderers/list-field-renderer';
import Bootstrap4StampRenderer from '@de-re-crud/renderer-bootstrap4/renderers/stamp-renderer';
import Bootstrap4TableLinkedStructFieldRenderer from '@de-re-crud/renderer-bootstrap4/renderers/table-linked-struct-field-renderer';

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
    listField: Bootstrap4ListFieldRenderer,
    moneyField: Bootstrap4InputFieldRenderer,
    percentField: Bootstrap4InputFieldRenderer,
    stamp: Bootstrap4StampRenderer,
    tableLinkedStructField: Bootstrap4TableLinkedStructFieldRenderer,
    textField: Bootstrap4InputFieldRenderer
  },
  formClassName: 'de-re-crud-form-bootstrap4'
};

export default Bootstrap4RendererOptions;
