import { connect } from 'redux-zero/preact';
import { StoreState } from '../store';
import { FormProps } from './form.props';
import Form from './form.component';

const mapToProps = ({ structs, value }: StoreState): Partial<FormProps> => ({
  structs,
  value
});

export default connect(mapToProps)(Form);
