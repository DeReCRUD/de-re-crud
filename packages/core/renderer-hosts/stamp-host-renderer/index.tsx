import { connect } from 'redux-zero/preact';
import { IStoreState } from '../../store';
import formPathToValue from '../../utils/form-path-to-value';
import StampHostRenderer from './stamp-host-renderer.component';
import {
  IStampHostRendererConnectProps,
  IStampHostRendererProps
} from './stamp-host-renderer.props';

const mapToProps = (
  { value, rendererOptions }: IStoreState,
  { parentPath }: IStampHostRendererConnectProps
): Partial<IStampHostRendererProps> => ({
  formValue: value,
  parentValue: parentPath ? formPathToValue(value, parentPath) : value,
  rendererOptions
});

export default connect(mapToProps)(StampHostRenderer);
