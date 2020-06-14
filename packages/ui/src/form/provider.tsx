import { InternalSchemaHelper, generateChildErrors } from '@de-re-crud/core';
import { h, FunctionalComponent } from 'preact';
import { useMemo, useCallback } from 'preact/hooks';
import { Provider } from 'redux-zero/preact';
import NavProvider from '../utils/navigation/provider';
import { getStore } from '../store';
import { FormContext, IFormContext } from './form.context';
import { validateBlock } from './form.actions';
import { INavState } from '../utils/navigation/context';

export interface IFormProviderProps {
  formId: string;
}

const FormProvider: FunctionalComponent<IFormProviderProps> = ({
  formId,
  children,
}) => {
  const store = getStore(formId);

  const { navStack, formSubmitting } = store.getState();

  const setSubmitting = useCallback(
    (newSubmitting: boolean) => {
      store.setState({
        formSubmitting: newSubmitting,
      });
    },
    [store],
  );

  const handleNavStackChange = useCallback(
    (newNavStack: INavState[]) => {
      store.setState({
        navStack: newNavStack,
      });
    },
    [store],
  );

  const contextValue = useMemo(
    () => {
      const value: IFormContext = {
        submitting: formSubmitting,
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
    [formSubmitting, setSubmitting, store],
  );

  return (
    <Provider store={store}>
      <FormContext.Provider value={contextValue}>
        <NavProvider stack={navStack} onStackChange={handleNavStackChange}>
          {children}
        </NavProvider>
      </FormContext.Provider>
    </Provider>
  );
};

export default FormProvider;
