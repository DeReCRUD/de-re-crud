import { connect } from 'redux-zero/preact';
import { ComponentConstructor } from '../../models/constructors';
import { IStoreState } from '../../store';
import formPathToValue from '../../utils/form-path-to-value';
import StampHostRenderer from './stamp-host-renderer.component';
import {
  IStampHostRendererConnectProps,
  IStampHostRendererProps,
} from './stamp-host-renderer.props';

const mapToProps = (
  { value, renderers }: IStoreState,
  { parentPath }: IStampHostRendererConnectProps,
): Partial<IStampHostRendererProps> => ({
  formValue: value,
  parentValue: formPathToValue(value, parentPath),
  renderers,
});

export default connect(mapToProps)(StampHostRenderer) as ComponentConstructor<
  IStampHostRendererConnectProps
>;
