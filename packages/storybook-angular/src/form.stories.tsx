import { storiesOf } from '@storybook/angular';
import {
  FormComponent,
  DeReCrudModule,
  IFormSubmission,
} from '@de-re-crud/angular/public-api';
import schema from './schema.json';

storiesOf('Form', module).add('default', () => ({
  moduleMetadata: {
    imports: [DeReCrudModule],
  },
  component: FormComponent,
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <drc-form [schema]="schema" [struct]="struct" (submitted)="onSubmit($event)"></drc-form>
        </div>
      </div>
    </div>
  `,
  props: {
    schema,
    struct: 'struct',
    onSubmit: (e: IFormSubmission) => {
      e.onComplete();
    },
  },
}));
