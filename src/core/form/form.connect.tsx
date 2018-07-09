import { connect } from 'redux-zero/preact';
import { StoreState } from '../store';
import navigationActions from '../navigation.actions';
import { FormProps } from './form.props';
import Form from './form.component';

const mapToProps = ({ structs, value, navStack }: StoreState): Partial<FormProps> => ({
  structs,
  value,
  navStack
});

export default connect(mapToProps, navigationActions)(Form);
