import { h, Form } from '@de-re-crud/ui';
import { ISchemaJson } from '@de-re-crud/core';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import schema from './schema.json';

storiesOf('Form', module).add('default', () => (
  <Form
    schema={schema as ISchemaJson}
    struct="struct"
    onSubmit={(value, cb) => {
      action('form submit')(value);
      cb();
    }}
  />
));
