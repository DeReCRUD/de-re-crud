import { h, Component } from 'preact';
import Form from '@de-re-crud/forms/form';
import { FormSubmissionCallback, CollectionReferences } from '@de-re-crud/forms/form/form.props';
import Bootstrap3RendererOptions from '@de-re-crud/forms-renderer-bootstrap3/options';
import * as schemJson from './schema.json';
import './style.css';
import { IOption } from '@de-re-crud/forms/models/schema';

export default class App extends Component {
  collectionReferences: CollectionReferences;

  constructor(props) {
    super(props);

    this.collectionReferences = {
      field: ({ fields }: { fields: any[]}) => {
        const options: IOption[] = [];

        if (fields) {
          fields.forEach((field) => {
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
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div class="col-sm-6">
            <Form
              schema={schemJson}
              struct="struct"
              rendererOptions={Bootstrap3RendererOptions}
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
