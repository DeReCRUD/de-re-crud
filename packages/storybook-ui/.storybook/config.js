import { h, DeReCrudUiOptions } from '@de-re-crud/ui';
import { Bootstrap4RendererOptions } from '@de-re-crud/theme-bootstrap4';
import { addDecorator, configure } from '@storybook/preact';
import 'bootstrap-css-only/css/bootstrap.css';

DeReCrudUiOptions.setDefaults({
  rendererOptions: Bootstrap4RendererOptions,
});

const req = require.context('../src', true, /\.stories\.(tsx?)$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

addDecorator((story) => (
  <div className="container">
    <div className="row">
      <div className="col-md-12">{story()}</div>
    </div>
  </div>
));

configure(loadStories, module);
