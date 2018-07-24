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
    path
  }: FieldHostRendererConnectProps
): Partial<FieldHostRendererProps> => {
  const fieldPath = path
    ? `${path}.${name}`
    : name;

  const pathArray = fieldPath.split('.');

  const parentPath =
    pathArray.length < 2
      ? null
      : pathArray.slice(0, pathArray.length - 1).join('.');

  return {
    fieldPath,
    touched: touched[fieldPath] || false,
    errors: errors[fieldPath] || [],
    childErrors: childErrors[fieldPath] || {},
    parentPath,
    formValue: value,
    rendererOptions,
    collectionReferences
  };
};

export default connect(
  mapToProps,
  combineActions(fieldHostRendererActions, navigationActions)
)(FieldHostRenderer);
