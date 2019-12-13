import { storiesOf } from '@storybook/preact';
import { ISchemaJson } from '@de-re-crud/core';
import { h, CollectionForm } from '@de-re-crud/ui';
import schema from './schema.json';

storiesOf('CollectionForm (WIP)', module).add('default', () => (
  <CollectionForm
    schema={schema as ISchemaJson}
    struct="struct"
    block="table"
  />
));
