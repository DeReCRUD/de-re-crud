import { formPathToValue } from '@de-re-crud/core';
import { connect } from 'redux-zero/preact';
import { useContext } from 'preact/hooks';
import { combineActions } from 'redux-zero/utils';
import { h, FunctionalComponent, ComponentConstructor } from '../../../h';
import navigationActions from '../../../navigation.actions';
import { IStoreState } from '../../../store';
import { FormContext } from '../../../form/form.context';
import fieldHostRendererActions from './field-host-renderer.actions';
import FieldHostRenderer from './field-host-renderer.component';
import {
  IFieldHostRendererConnectProps,
  IFieldHostRendererProps,
} from './field-host-renderer.props';

const mapToProps = (
  {
    schema,
    value,
    touched,
    busy,
    formDisabled,
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

  const combinedErrors: string[] = [];

  if (typeof externalErrors[fieldPath] !== 'undefined') {
    combinedErrors.push(...externalErrors[fieldPath]);
  }

  if (typeof errors[fieldPath] !== 'undefined') {
    combinedErrors.push(...errors[fieldPath]);
  }

  return {
    schema,
    childErrors: combinedChildErrors,
    collectionReferences,
    errors: combinedErrors,
    fieldPath,
    fieldValue: formPathToValue(value, fieldPath),
    formDisabled,
    formLocked,
    formValue: value,
    parentValue: formPathToValue(value, parentPath),
    busy,
    renderers,
    touched: touched[fieldPath] || false,
  };
};

const FieldHostRendererWrapper: FunctionalComponent<IFieldHostRendererProps> = (
  props,
) => {
  const { submitting } = useContext(FormContext);

  return <FieldHostRenderer {...props} formSubmitting={submitting} />;
};

export default connect(
  mapToProps,
  combineActions(fieldHostRendererActions, navigationActions),
)(FieldHostRendererWrapper) as ComponentConstructor<
  IFieldHostRendererConnectProps
>;
