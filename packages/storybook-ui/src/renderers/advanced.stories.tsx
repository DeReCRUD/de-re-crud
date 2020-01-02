import { h, Form } from '@de-re-crud/ui';
import { ISchemaJson } from '@de-re-crud/core';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import schema from './person-schema.json';
import TreeRenderer from './tree-renderer';

storiesOf('Renderers/Advanced Examples', module).add(
  'recursive (collapsible)',
  () => (
    <Form
      schema={schema as ISchemaJson}
      struct="person"
      renderers={{
        tableLinkedStructField: TreeRenderer,
      }}
      onSubmit={(value, cb) => {
        action('form submit')(value);
        cb();
      }}
    />
  ),
);
