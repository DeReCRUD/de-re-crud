import { RendererOptions } from '@de-re-crud/forms/models/renderer-options';
import Bootstrap3ButtonRenderer from './renderers/button-renderer';
import Bootstrap3FieldContainerRenderer from './renderers/field-container-renderer';
import Bootstrap3InputFieldRenderer from './renderers/input-field-renderer';
import Bootstrap3BooleanFieldRenderer from './renderers/boolean-field-renderer';
import Bootstrap3ListFieldRenderer from './renderers/list-field-renderer';
import Bootstrap3TableLinkedStructFieldRenderer from './renderers/table-linked-struct-field-renderer';
import 'bootstrap/dist/css/bootstrap.css';

const Bootstrap3RendererOptions: RendererOptions = {
  formClassName: 'de-re-crud-form-bootstrap3',
  components: {
    button: Bootstrap3ButtonRenderer,
    fieldContainer: Bootstrap3FieldContainerRenderer,
    textField: Bootstrap3InputFieldRenderer,
    keywordField: Bootstrap3InputFieldRenderer,
    integerField: Bootstrap3InputFieldRenderer,
    estimateField: Bootstrap3InputFieldRenderer,
    dateField: Bootstrap3InputFieldRenderer,
    booleanField: Bootstrap3BooleanFieldRenderer,
    percentField: Bootstrap3InputFieldRenderer,
    moneyField: Bootstrap3InputFieldRenderer,
    foreignKeyField: Bootstrap3ListFieldRenderer,
    tableLinkedStructField: Bootstrap3TableLinkedStructFieldRenderer,
    inlineLinkedStructField: Bootstrap3InputFieldRenderer,
    listField: Bootstrap3ListFieldRenderer,
    derivedField: Bootstrap3InputFieldRenderer,
    stampField: Bootstrap3InputFieldRenderer
  }
};

export default Bootstrap3RendererOptions;