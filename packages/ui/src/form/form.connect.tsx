import { connect } from 'redux-zero/preact';
import { combineActions } from 'redux-zero/utils';
import navigationActions from '../navigation.actions';
import { IStoreState } from '../store';
import formActions from './form.actions';
import Form from './form.component';
import { IFormProps } from './form.props';

const mapToProps = ({
  block,
  navStack,
  buttonOptions,
  onCancel,
  renderers,
  schema,
  struct,
  formClassName,
  formDisabled,
  formLocked,
  formSubmitting,
  type,
}: IStoreState): Partial<IFormProps> => ({
  block,
  buttonOptions,
  formClassName,
  formDisabled,
  formLocked,
  formSubmitting,
  navStack,
  onCancel,
  renderers,
  schema,
  struct,
  type,
});

export default connect(
  mapToProps,
  combineActions(navigationActions, formActions),
)(Form);
