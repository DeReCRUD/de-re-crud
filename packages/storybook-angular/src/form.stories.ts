import { storiesOf } from '@storybook/angular';
import {
  DeReCrudModule,
  IFormSubmission,
} from '@de-re-crud/angular/public-api';
import schema from './schema.json';

storiesOf('Form', module).add('default', () => ({
  moduleMetadata: {
    imports: [DeReCrudModule],
  },
  template: `
    <drc-form [schema]="schema" [struct]="struct" (submitted)="onSubmit($event)"></drc-form>
  `,
  props: {
    schema,
    struct: 'struct',
    onSubmit: (e: IFormSubmission) => {
      e.onComplete();
    },
  },
}));
