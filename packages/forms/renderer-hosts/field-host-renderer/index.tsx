import { connect } from "redux-zero/preact";
import { combineActions } from "redux-zero/utils";
import navigationActions from "../../navigation.actions";
import { IStoreState } from "../../store";
import fieldHostRendererActions from "./field-host-renderer.actions";
import FieldHostRenderer from "./field-host-renderer.component";
import {
  IFieldHostRendererConnectProps,
  IFieldHostRendererProps
} from "./field-host-renderer.props";

const mapToProps = (
  {
    value,
    touched,
    errors,
    childErrors,
    rendererOptions,
    collectionReferences
  }: IStoreState,
  {
    fieldReference: {
      field: { name }
    },
    parentPath
  }: IFieldHostRendererConnectProps
): Partial<IFieldHostRendererProps> => {
  const fieldPath = parentPath ? `${parentPath}.${name}` : name;

  return {
    childErrors: childErrors[fieldPath] || {},
    collectionReferences,
    errors: errors[fieldPath] || [],
    fieldPath,
    formValue: value,
    rendererOptions,
    touched: touched[fieldPath] || false
  };
};

export default connect(
  mapToProps,
  combineActions(fieldHostRendererActions, navigationActions)
)(FieldHostRenderer);
