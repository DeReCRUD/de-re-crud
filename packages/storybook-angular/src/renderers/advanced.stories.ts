import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { IFormSubmission } from '@de-re-crud/angular';
import { CustomRendererModule } from './app/custom-renderer.module';
import schema from './person-schema.json';

storiesOf('Renderers/Advanced Examples', module).add(
  'recursive (collapsible)',
  () => ({
    moduleMetadata: {
      imports: [CustomRendererModule],
    },
    template: `
  <drc-custom-renderer-form [schema]="schema" struct="person" rendererType="tree" [initialValue]="initialValue" (submitted)="onSubmit($event)"></drc-custom-renderer-form>
  `,
    props: {
      schema,
      onSubmit: (e: IFormSubmission) => {
        action('form submit')(e.value);
        e.onComplete();
      },
    },
  }),
);
