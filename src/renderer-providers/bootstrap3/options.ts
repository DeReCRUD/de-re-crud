import { RendererOptions } from '../../core/models/renderer-options';
import Bootstrap3FieldContainerRenderer from './renderers/field-container.renderer';
import Bootstrap3TextFieldRenderer from './renderers/text-field-renderer.component';
import 'bootstrap/dist/css/bootstrap.css';

const Bootstrap3RendererOptions: RendererOptions = {
  formClassName: 'de-re-crud-form-bootstrap3',
  components: {
    fieldContainer: Bootstrap3FieldContainerRenderer,
    textField: Bootstrap3TextFieldRenderer,
    keywordField: Bootstrap3TextFieldRenderer,
    integerField: Bootstrap3TextFieldRenderer,
    estimateField: Bootstrap3TextFieldRenderer,
    dateField: Bootstrap3TextFieldRenderer,
    booleanField: Bootstrap3TextFieldRenderer,
    percentField: Bootstrap3TextFieldRenderer,
    moneyField: Bootstrap3TextFieldRenderer,
    foreignKeyField: Bootstrap3TextFieldRenderer,
    linkedStructField: Bootstrap3TextFieldRenderer,
    listField: Bootstrap3TextFieldRenderer,
    derivedField: Bootstrap3TextFieldRenderer,
    stampField: Bootstrap3TextFieldRenderer
  }
};

export default Bootstrap3RendererOptions;