import { h, Component } from 'preact';
import Form from './core/form/form.component';
import * as schemJson from './schema.json';
import Bootstrap3RendererOptions from './renderer-providers/bootstrap3/options';
import './style';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <div class="col-sm-6">
          <Form
            schema={schemJson}
            struct="struct"
            rendererOptions={Bootstrap3RendererOptions}
          />
        </div>
      </div>
    );
  }
}
