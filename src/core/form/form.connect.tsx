import { connect } from 'redux-zero/preact';
import { StoreState } from '../store';
import Form from './form.component';
import { FormProps } from './form.props';

const mapToProps = ({ structs, value }: StoreState): Partial<FormProps> => ({
  structs,
  value
});

export default connect(mapToProps)(Form);
