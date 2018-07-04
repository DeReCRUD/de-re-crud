import { h, Component } from 'preact';
import * as schemJson from './schema.json';
import Bootstrap3RendererOptions from './renderer-providers/bootstrap3/options';
import Form from './core/form';
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
