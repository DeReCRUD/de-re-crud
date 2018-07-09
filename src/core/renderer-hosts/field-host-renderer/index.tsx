import { connect } from 'redux-zero/preact';
import { combineActions } from 'redux-zero/utils';
import { StoreState } from '../../store';
import { FieldHostRendererProps } from './field-host-renderer.props';
import FieldHostRenderer from './field-host-renderer.component';
import fieldHostRendererActions from './field-host-renderer.actions';
import navigationActions from '../../navigation.actions';

const mapToProps = ({
  value
}: StoreState): Partial<FieldHostRendererProps> => ({
  formValue: value
});

export default connect(
  mapToProps,
  combineActions(fieldHostRendererActions, navigationActions)
)(FieldHostRenderer);
