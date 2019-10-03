import { h } from '@de-re-crud/ui';
import { storiesOf } from '@storybook/preact';
import { Bootstrap4TextAreaFieldRenderer } from '@de-re-crud/theme-bootstrap4';
import { createDefaultProps } from './create-default-props';

const defaultProps = createDefaultProps('textArea', 'Text Area', 'text');

storiesOf('Text area renderer', module).add('default', () => (
  <Bootstrap4TextAreaFieldRenderer {...defaultProps} value={undefined} />
));
