import { connect } from 'redux-zero/preact';
import { combineActions } from 'redux-zero/utils';
import { StoreState } from '../../store';
import {
  FieldHostRendererProps,
  FieldHostRendererConnectProps
} from './field-host-renderer.props';
import FieldHostRenderer from './field-host-renderer.component';
import fieldHostRendererActions from './field-host-renderer.actions';
import navigationActions from '../../navigation.actions';

const mapToProps = (
  {
    value,
    navStack,
    touched,
    errors,
    childErrors,
    rendererOptions,
    collectionReferences
  }: StoreState,
  {
    fieldReference: {
      field: { name }
    },
    parentPath,
  }: FieldHostRendererConnectProps
): Partial<FieldHostRendererProps> => {
  const fieldPath = parentPath
    ? `${parentPath}.${name}`
    : name;

  return {
    fieldPath,
    touched: touched[fieldPath] || false,
    errors: errors[fieldPath] || [],
    childErrors: childErrors[fieldPath] || {},
    formValue: value,
    rendererOptions,
    collectionReferences
  };
};

export default connect(
  mapToProps,
  combineActions(fieldHostRendererActions, navigationActions)
)(FieldHostRenderer);
