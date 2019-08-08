import Form from '@de-re-crud/core/form';
import {
  FormSubmissionCallback,
  ICollectionReferences,
  IFieldChangeNotificationParams,
  IFieldParentChangeNotificationParams,
} from '@de-re-crud/core/form/form.props';
import Logger from '@de-re-crud/core/logger';
import Bootstrap4RendererOptions from '@de-re-crud/renderer-bootstrap4/options';
import { Component, h } from 'preact';
import schemJson from './schema.json';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

export default class App extends Component {
  private collectionReferences: ICollectionReferences = {
    field: ({ formValue: { fields } }) => fields,
  };

  private onFieldChange = (params: IFieldChangeNotificationParams) => {
    Logger.debug('field changed', params);
  };

  private onFieldParentChange = (
    params: IFieldParentChangeNotificationParams,
  ) => {
    Logger.debug('field parent changed', params);
  };

  private onSubmit = (value: any, cb: FormSubmissionCallback) => {
    Logger.debug('submitted values', value);

    cb();
  };

  public render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <Form
              schema={schemJson}
              struct="struct"
              collectionReferences={this.collectionReferences}
              rendererOptions={Bootstrap4RendererOptions}
              onFieldChange={this.onFieldChange}
              onFieldChangeType="input"
              onFieldParentChange={this.onFieldParentChange}
              onSubmit={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}
