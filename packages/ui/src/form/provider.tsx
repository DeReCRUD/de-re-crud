import { InternalSchemaHelper, generateChildErrors } from '@de-re-crud/core';
import { h, FunctionalComponent } from 'preact';
import { useMemo, useCallback, useState, useEffect } from 'preact/hooks';
import { Provider } from 'redux-zero/preact';
import NavProvider from '../utils/navigation/provider';
import { getStore } from '../store';
import { FormContext, IFormContext } from './form.context';
import { validateBlock } from './form.actions';
import { INavState } from '../utils/navigation/context';
import { FormState } from '../formState';

export interface IFormProviderProps {
  formId: string;
}

const FormProvider: FunctionalComponent<IFormProviderProps> = ({
  formId,
  children,
}) => {
  const store = getStore(formId);
  const [formState, setFormState] = useState(FormState.get(formId));

  useEffect(() => FormState.subscribe(formId, setFormState), [formId]);

  const setSubmitting = useCallback(
    (submitting: boolean) => {
      FormState.update(formId, {
        submitting,
      });
    },
    [formId],
  );

  const setNavStack = useCallback(
    (navStack: INavState[]) => {
      FormState.update(formId, {
        navStack,
      });
    },
    [formId],
  );

  const contextValue = useMemo(
    () => {
      const value: IFormContext = {
        submitting: formState.submitting,
        submit: () => {
          const state = store.getState();
          const { schema, struct: structName, block: blockName } = state;

          const struct = InternalSchemaHelper.getStruct(schema, structName);

          const block = InternalSchemaHelper.getBlock(
            schema,
            structName,
            blockName,
          );

          const result = validateBlock(
            state,
            struct.name,
            block.name,
            state.value,
          );
          const { outputValue, errors, touched, hasErrors } = result;

          store.setState({
            externalChildErrors: generateChildErrors(errors),
            externalErrors: errors,
            touched,
          });

          if (hasErrors) {
            return;
          }

          setSubmitting(true);

          state.onSubmit(outputValue, (submissionErrors) => {
            if (submissionErrors) {
              store.setState({
                externalChildErrors: generateChildErrors(submissionErrors),
                externalErrors: submissionErrors,
              });
            } else {
              store.setState({
                externalChildErrors: {},
                externalErrors: {},
              });
            }

            setSubmitting(false);
          });
        },
      };

      return value;
    },
    [formState.submitting, setSubmitting, store],
  );

  return (
    <Provider store={store}>
      <FormContext.Provider value={contextValue}>
        <NavProvider stack={formState.navStack} onStackChange={setNavStack}>
          {children}
        </NavProvider>
      </FormContext.Provider>
    </Provider>
  );
};

export default FormProvider;
