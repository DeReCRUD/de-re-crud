import { h, Component } from 'preact';
import Form from '@de-re-crud/forms/form';
import Bootstrap3RendererOptions from '../forms-renderer-bootstrap3/options';
import * as schemJson from './schema.json';
import './style.css';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div class="col-sm-6">
            <Form
              schema={schemJson}
              struct="struct"
              rendererOptions={Bootstrap3RendererOptions}
            />
          </div>
        </div>
      </div>
    );
  }
}
