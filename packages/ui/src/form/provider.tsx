import { h, FunctionalComponent } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { Provider } from 'redux-zero/preact';
import { InternalSchemaHelper, generateChildErrors } from '@de-re-crud/core';
import { FormContext, IFormContext } from './form.context';
import { getStore } from '../store';
import { validateBlock } from './form.actions';
import NavProvider from '../utils/navigation/provider';

export interface IFormProviderProps {
  formId: string;
}

const FormProvider: FunctionalComponent<IFormProviderProps> = ({
  formId,
  children,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const store = getStore(formId);

  const contextValue = useMemo(
    () => {
      const value: IFormContext = {
        submitting,
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
    [store, submitting],
  );

  return (
    <Provider store={store}>
      <FormContext.Provider value={contextValue}>
        <NavProvider>{children}</NavProvider>
      </FormContext.Provider>
    </Provider>
  );
};

export default FormProvider;
