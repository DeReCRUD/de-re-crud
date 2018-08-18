import { connect } from 'redux-zero/preact';
import { combineActions } from 'redux-zero/utils';
import { ComponentConstructor } from '../models/constructors';
import navigationActions from '../navigation.actions';
import { IStoreState } from '../store';
import formActions from './form.actions';
import Form from './form.component';
import { IFormProps } from './form.props';

const mapToProps = ({
  block,
  navStack,
  rendererOptions,
  buttonOptions,
  schema,
  struct,
  structs,
  submitting,
  type,
  value
}: IStoreState): Partial<IFormProps> => ({
  block,
  buttonOptions,
  navStack,
  rendererOptions,
  schema,
  struct,
  structs,
  submitting,
  type,
  value
});

export default connect(
  mapToProps,
  combineActions(navigationActions, formActions)
)(Form) as ComponentConstructor<{}>;