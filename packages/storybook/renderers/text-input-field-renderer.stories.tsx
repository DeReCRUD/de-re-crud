import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import Bootstrap4InputFieldRenderer from '@de-re-crud/renderer-bootstrap4/renderers/input-field-renderer';
import { createDefaultProps } from './create-default-props';

const defaultProps = createDefaultProps('textInput', 'Text Input', 'text');

storiesOf('Text input renderer', module).add('default', () => (
  <Bootstrap4InputFieldRenderer {...defaultProps} value={undefined} />
));
