import { connect } from 'redux-zero/preact';
import { StoreState } from '../store';
import Form from './form.component';
import { FormProps } from './form.props';

const mapToProps = ({ structs }: StoreState): Partial<FormProps> => ({
  structs
});

export default connect(mapToProps)(Form);
