import { connect } from 'redux-zero/preact';
import { IStoreState } from '../store';
import Form from './form.component';
import { IFormProps } from './form.props';

const mapToProps = ({
  block,
  buttonOptions,
  onCancel,
  renderers,
  schema,
  struct,
  formClassName,
  formDisabled,
  formLocked,
  type,
}: IStoreState): Partial<IFormProps> => ({
  block,
  buttonOptions,
  formClassName,
  formDisabled,
  formLocked,
  onCancel,
  renderers,
  schema,
  struct,
  type,
});

export default connect(mapToProps)(Form);
