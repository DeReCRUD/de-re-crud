import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { IFormSubmission } from '@de-re-crud/angular';
import { CustomRendererModule } from './app/custom-renderer.module';

storiesOf('Renderers/Custom', module)
  .add('text field', () => ({
    moduleMetadata: {
      imports: [CustomRendererModule],
    },
    template: `
    <drc-custom-renderer-form block="text" (submitted)="onSubmit($event)"></drc-custom-renderer-form>
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
    <drc-custom-renderer-form block="tableLinkedStruct" (submitted)="onSubmit($event)"></drc-custom-renderer-form>
  `,
    props: {
      onSubmit: (e: IFormSubmission) => {
        action('form submit')(e.value);
        e.onComplete();
      },
    },
  }))
  .add('inline linked struct field', () => ({
    moduleMetadata: {
      imports: [CustomRendererModule],
    },
    template: `
    <drc-custom-renderer-form block="inlineLinkedStruct" (submitted)="onSubmit($event)"></drc-custom-renderer-form>
  `,
    props: {
      onSubmit: (e: IFormSubmission) => {
        action('form submit')(e.value);
        e.onComplete();
      },
    },
  }));
