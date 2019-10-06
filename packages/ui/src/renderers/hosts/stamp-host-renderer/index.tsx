import { connect } from 'redux-zero/preact';
import { ComponentConstructor } from 'preact';
import { IStoreState } from '../../../store';
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
