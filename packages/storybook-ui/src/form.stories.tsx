import { h, Form } from '@de-re-crud/ui';
import { ISchemaJson } from '@de-re-crud/core';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import schema from './schema.json';

storiesOf('Form', module).add('default', () => (
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <Form
          schema={schema as ISchemaJson}
          struct="struct"
          onSubmit={action('form submit')}
        />
      </div>
    </div>
  </div>
));
