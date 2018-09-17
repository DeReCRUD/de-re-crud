import Form from '@de-re-crud/core/form';
import {
  FormSubmissionCallback,
  ICollectionReferences
} from '@de-re-crud/core/form/form.props';
import { DeReCrudOptions } from '@de-re-crud/core/options';
import Bootstrap3RendererOptions from '@de-re-crud/renderer-bootstrap3/options';
import 'bootstrap/dist/css/bootstrap.css';
import { Component, h } from 'preact';
import schemJson from './schema.json';
import './style.css';

DeReCrudOptions.setDefaults({ rendererOptions: Bootstrap3RendererOptions });

export default class App extends Component {
  private collectionReferences: ICollectionReferences = {
    field: ({ formValue: { fields } }) => fields
  };

  public render() {
    return (
      <div className="container">
        <div className="row">
          <div class="col-sm-8">
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

  private onSubmit = (_: object, cb: FormSubmissionCallback) => {
    cb();
  };
}
