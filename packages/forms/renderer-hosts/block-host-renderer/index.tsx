import { connect } from "redux-zero/preact";
import { StoreState } from "../../store";
import { BlockHostRendererProps } from "./block-host-renderer.props";
import BlockHostRenderer from "./block-host-renderer.component";

const mapToProps = ({
  value
}: StoreState): Partial<BlockHostRendererProps> => ({
  formValue: value
});

export default connect(mapToProps)(BlockHostRenderer);
