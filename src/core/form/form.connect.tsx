import { connect } from 'redux-zero/preact';
import { StoreState } from '../store';
import { FormProps } from './form.props';
import Form from './form.component';
import formActions from './form.actions';

const mapToProps = ({ structs, value }: StoreState): Partial<FormProps> => ({
  structs,
  value
});

export default connect(mapToProps, formActions)(Form);
