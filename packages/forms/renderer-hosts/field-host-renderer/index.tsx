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
  { value, navStack, errors }: StoreState,
  {
    fieldReference: {
      field: { name }
    }
  }: FieldHostRendererConnectProps
): Partial<FieldHostRendererProps> => {
  const path = navStack.length
    ? navStack[navStack.length - 1].path + '.' + name
    : name;

  const pathArray = path.split('.');

  const parentPath =
    pathArray.length < 2
      ? null
      : pathArray.slice(0, pathArray.length - 1).join('.');

  return {
    fieldPath: path,
    errors: errors[path] || [],
    parentPath,
    formValue: value
  };
};

export default connect(
  mapToProps,
  combineActions(fieldHostRendererActions, navigationActions)
)(FieldHostRenderer);
