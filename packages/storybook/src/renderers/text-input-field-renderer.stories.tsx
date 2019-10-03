import { h } from '@de-re-crud/ui';
import { storiesOf } from '@storybook/preact';
import { Bootstrap4InputFieldRenderer } from '@de-re-crud/theme-bootstrap4';
import { createDefaultProps } from './create-default-props';

const defaultProps = createDefaultProps('textInput', 'Text Input', 'text');

storiesOf('Text input renderer', module).add('default', () => (
  <Bootstrap4InputFieldRenderer {...defaultProps} value={undefined} />
));
