import { connect } from "redux-zero/preact";
import { combineActions } from "redux-zero/utils";
import navigationActions from "../navigation.actions";
import { IStoreState } from "../store";
import formActions from "./form.actions";
import Form from "./form.component";
import { IFormProps } from "./form.props";

const mapToProps = ({
  block,
  navStack,
  rendererOptions,
  struct,
  structs,
  submitting,
  value
}: IStoreState): Partial<IFormProps> => ({
  block,
  navStack,
  rendererOptions,
  struct,
  structs,
  submitting,
  value
});

export default connect(
  mapToProps,
  combineActions(navigationActions, formActions)
)(Form);
