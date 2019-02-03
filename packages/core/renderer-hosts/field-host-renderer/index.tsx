import { connect } from 'redux-zero/preact';
import { combineActions } from 'redux-zero/utils';
import { ComponentConstructor } from '../../models/constructors';
import navigationActions from '../../navigation.actions';
import { IStoreState } from '../../store';
import formPathToValue from '../../utils/form-path-to-value';
import fieldHostRendererActions from './field-host-renderer.actions';
import FieldHostRenderer from './field-host-renderer.component';
import {
  IFieldHostRendererConnectProps,
  IFieldHostRendererProps,
} from './field-host-renderer.props';

const mapToProps = (
  {
    value,
    touched,
    readOnly,
    formLocked,
    errors,
    childErrors,
    externalChildErrors,
    externalErrors,
    renderers,
    collectionReferences,
  }: IStoreState,
  { fieldPath, parentPath }: IFieldHostRendererConnectProps,
): Partial<IFieldHostRendererProps> => {
  const combinedChildErrors = {
    ...externalChildErrors[fieldPath],
  };

  if (childErrors[fieldPath]) {
    Object.keys(childErrors[fieldPath]).forEach((key) => {
      if (!combinedChildErrors[key]) {
        combinedChildErrors[key] = childErrors[fieldPath][key] || false;
      }
    });
  }

  const combinedErrors = [];
  combinedErrors.push(...externalErrors[fieldPath]);
  combinedErrors.push(...errors[fieldPath]);

  return {
    childErrors: combinedChildErrors,
    collectionReferences,
    errors: combinedErrors,
    fieldPath,
    fieldValue: formPathToValue(value, fieldPath),
    formLocked,
    formValue: value,
    parentValue: formPathToValue(value, parentPath),
    readOnly,
    renderers,
    touched: touched[fieldPath] || false,
  };
};

export default connect(
  mapToProps,
  combineActions(fieldHostRendererActions, navigationActions),
)(FieldHostRenderer) as ComponentConstructor<IFieldHostRendererConnectProps>;
