import { h, Component } from 'preact';
import Form from '@de-re-crud/forms/form';
import { DeReCrudInitializer } from '@de-re-crud/forms/options';
import { IOption } from '@de-re-crud/forms/models/schema';
import {
  FormSubmissionCallback,
  CollectionReferences
} from '@de-re-crud/forms/form/form.props';
import Bootstrap3RendererOptions from '@de-re-crud/forms-renderer-bootstrap3/options';
import schemJson from './schema.json';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

DeReCrudInitializer.setDefaults({ rendererOptions: Bootstrap3RendererOptions });

export default class App extends Component {
  collectionReferences: CollectionReferences;

  constructor(props) {
    super(props);

    this.collectionReferences = {
      field: ({ fields }: { fields: any[] }) => {
        const options: IOption[] = [];

        if (fields) {
          fields.forEach(field => {
            if (field.name && field.label) {
              options.push({ label: field.label, value: field.name });
            }
          });
        }

        return options;
      }
    };
  }

  onSubmit = (value: any, cb: FormSubmissionCallback) => {
    cb();
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div class="col-sm-6">
            <Form
              schema={schemJson}
              struct="struct"
              collectionReferences={this.collectionReferences}
              onChangeType="change"
              onSubmit={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}
