import { connect } from "redux-zero/preact";
import { IStoreState } from "../../store";
import BlockHostRenderer from "./block-host-renderer.component";
import { IBlockHostRendererProps } from "./block-host-renderer.props";

const mapToProps = ({
  value
}: IStoreState): Partial<IBlockHostRendererProps> => ({
  formValue: value
});

export default connect(mapToProps)(BlockHostRenderer);
