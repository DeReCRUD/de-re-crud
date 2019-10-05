import { h, DeReCrudUiOptions } from '@de-re-crud/ui';
import { Bootstrap4RendererOptions } from '@de-re-crud/theme-bootstrap4';
import { addDecorator, configure } from '@storybook/angular';
import 'bootstrap-css-only/css/bootstrap.css';

DeReCrudUiOptions.setDefaults({
  rendererOptions: Bootstrap4RendererOptions,
});

const req = require.context('../src', true, /\.stories\.(tsx?)$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

addDecorator((storyFn) => {
  const story = storyFn();

  return {
    ...story,
    template: `
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            ${story.template}
          </div>
        </div>
      </div>
    `,
  };
});

configure(loadStories, module);
