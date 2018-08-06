import { connect } from "redux-zero/preact";
import { combineActions } from "redux-zero/utils";
import { StoreState } from "../store";
import navigationActions from "../navigation.actions";
import formActions from "./form.actions";
import { FormProps } from "./form.props";
import Form from "./form.component";

const mapToProps = ({
  structs,
  struct,
  block,
  value,
  navStack,
  submitting,
  rendererOptions
}: StoreState): Partial<FormProps> => ({
  structs,
  struct,
  block,
  value,
  navStack,
  submitting,
  rendererOptions
});

export default connect(
  mapToProps,
  combineActions(navigationActions, formActions)
)(Form);
