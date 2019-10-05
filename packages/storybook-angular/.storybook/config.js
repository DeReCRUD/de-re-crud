import { configure } from '@storybook/angular';
import { DeReCrudUiOptions } from '@de-re-crud/ui';
import { Bootstrap4RendererOptions } from '@de-re-crud/theme-bootstrap4';
import 'bootstrap-css-only/css/bootstrap.css';

DeReCrudUiOptions.setDefaults({
  rendererOptions: Bootstrap4RendererOptions,
});

const req = require.context('../src', true, /\.stories\.(tsx?)$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
