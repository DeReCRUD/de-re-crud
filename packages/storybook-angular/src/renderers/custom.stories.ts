import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { IFormSubmission } from '@de-re-crud/angular/public-api';
import { CustomRendererModule } from './app/custom-renderer.module';

storiesOf('Custom renderers', module)
  .add('text field', () => ({
    moduleMetadata: {
      imports: [CustomRendererModule],
    },
    template: `
    <drc-text-field-renderer-form (submitted)="onSubmit($event)"></drc-text-field-renderer-form>
  `,
    props: {
      onSubmit: (e: IFormSubmission) => {
        action('form submit')(e.value);
        e.onComplete();
      },
    },
  }))
  .add('table linked struct field', () => ({
    moduleMetadata: {
      imports: [CustomRendererModule],
    },
    template: `
    <drc-table-linked-struct-field-renderer-form (submitted)="onSubmit($event)"></drc-table-linked-struct-field-renderer-form>
  `,
    props: {
      onSubmit: (e: IFormSubmission) => {
        action('form submit')(e.value);
        e.onComplete();
      },
    },
  }));
