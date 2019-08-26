import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { Form } from '@de-re-crud/core';
import schemaJson from './schema.json';

storiesOf('Form', module).add('default', () => (
  <div class="container">
    <div class="row">
      <div className="col-md-12">
        <Form
          schema={schemaJson}
          struct="struct"
          onSubmit={action('form submit')}
        />
      </div>
    </div>
  </div>
));
