import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import Bootstrap4TextAreaFieldRenderer from '@de-re-crud/renderer-bootstrap4/renderers/text-area-field-renderer';
import { createDefaultProps } from './create-default-props';

const defaultProps = createDefaultProps('textArea', 'Text Area', 'text');

storiesOf('Text area renderer', module).add('default', () => (
  <Bootstrap4TextAreaFieldRenderer {...defaultProps} value={undefined} />
));
