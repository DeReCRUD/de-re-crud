import { IRendererOptions } from '@de-re-crud/core/models/renderer-options';
import Bootstrap3BlockContainerRenderer from './renderers/block-container-renderer';
import Bootstrap3BooleanFieldRenderer from './renderers/boolean-field-renderer';
import Bootstrap3ButtonRenderer from './renderers/button-renderer';
import Bootstrap3FieldContainerRenderer from './renderers/field-container-renderer';
import Bootstrap3InlineLinkedStructFieldRenderer from './renderers/inline-linked-struct-field-renderer';
import Bootstrap3InputFieldRenderer from './renderers/input-field-renderer';
import Bootstrap3ListFieldRenderer from './renderers/list-field-renderer';
import Bootstrap3StampRenderer from './renderers/stamp-renderer';
import Bootstrap3TableLinkedStructFieldRenderer from './renderers/table-linked-struct-field-renderer';

const Bootstrap3RendererOptions: IRendererOptions = {
  components: {
    blockContainer: Bootstrap3BlockContainerRenderer,
    booleanField: Bootstrap3BooleanFieldRenderer,
    button: Bootstrap3ButtonRenderer,
    dateField: Bootstrap3InputFieldRenderer,
    derivedField: Bootstrap3InputFieldRenderer,
    estimateField: Bootstrap3InputFieldRenderer,
    fieldContainer: Bootstrap3FieldContainerRenderer,
    foreignKeyField: Bootstrap3ListFieldRenderer,
    inlineLinkedStructField: Bootstrap3InlineLinkedStructFieldRenderer,
    integerField: Bootstrap3InputFieldRenderer,
    keywordField: Bootstrap3InputFieldRenderer,
    listField: Bootstrap3ListFieldRenderer,
    moneyField: Bootstrap3InputFieldRenderer,
    percentField: Bootstrap3InputFieldRenderer,
    stamp: Bootstrap3StampRenderer,
    tableLinkedStructField: Bootstrap3TableLinkedStructFieldRenderer,
    textField: Bootstrap3InputFieldRenderer
  },
  formClassName: 'de-re-crud-form-bootstrap3'
};

export default Bootstrap3RendererOptions;
