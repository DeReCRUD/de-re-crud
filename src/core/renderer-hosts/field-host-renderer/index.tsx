import { connect } from 'redux-zero/preact';
import { StoreState } from '../../store';
import { FieldHostRendererProps } from './field-host-renderer.props';
import FieldHostRenderer from './field-host-renderer.component';
import fieldHostRendererActions from './field-host-renderer.actions';

const mapToProps = ({ value }: StoreState): Partial<FieldHostRendererProps> => ({
  formValue: value
});

export default connect(mapToProps, fieldHostRendererActions)(FieldHostRenderer);