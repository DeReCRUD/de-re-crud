import { configure } from '@storybook/preact';
import { DeReCrudOptions } from '@de-re-crud/core';
import { Bootstrap4RendererOptions } from '@de-re-crud/theme-bootstrap4';
import 'bootstrap-css-only/css/bootstrap.css';

DeReCrudOptions.setDefaults({
  rendererOptions: Bootstrap4RendererOptions,
});

const req = require.context('..', true, /\.stories\.(tsx?)$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
