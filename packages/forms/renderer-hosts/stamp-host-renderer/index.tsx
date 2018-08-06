import { connect } from "redux-zero/preact";
import { StoreState } from "../../store";
import formPathToValue from "../../utils/form-path-to-value";
import {
  StampHostRendererProps,
  StampHostRendererConnectProps
} from "./stamp-host-renderer.props";
import StampHostRenderer from "./stamp-host-renderer.component";

const mapToProps = (
  { value, rendererOptions }: StoreState,
  { parentPath }: StampHostRendererConnectProps
): Partial<StampHostRendererProps> => ({
  rendererOptions,
  formValue: value,
  parentValue: parentPath ? formPathToValue(value, parentPath) : value
});

export default connect(mapToProps)(StampHostRenderer);
