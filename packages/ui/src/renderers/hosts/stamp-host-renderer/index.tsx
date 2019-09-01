import { connect } from 'redux-zero/preact';
import { IStoreState } from '../../../store';
import { ComponentConstructor } from '../../../h';
import StampHostRenderer from './stamp-host-renderer.component';
import {
  IStampHostRendererConnectProps,
  IStampHostRendererProps,
} from './stamp-host-renderer.props';

const mapToProps = ({
  renderers,
}: IStoreState): Partial<IStampHostRendererProps> => ({
  renderers,
});

export default connect(mapToProps)(StampHostRenderer) as ComponentConstructor<
  IStampHostRendererConnectProps
>;
