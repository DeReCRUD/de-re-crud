import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { IFormSubmission } from '@de-re-crud/angular';
import { CustomRendererModule } from './app/custom-renderer.module';

storiesOf('Advanced Examples', module).add('tree', () => ({
  moduleMetadata: {
    imports: [CustomRendererModule],
  },
  template: `
  <drc-custom-renderer-form struct="person" rendererType="tree" (submitted)="onSubmit($event)"></drc-custom-renderer-form>
  `,
  props: {
    onSubmit: (e: IFormSubmission) => {
      action('form submit')(e.value);
      e.onComplete();
    },
  },
}));
