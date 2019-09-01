import { IErrors } from '../models/errors';
import formPathToValue from '../utils/form-path-to-value';
import generateChildErrors from '../utils/generate-child-errors';
import { validateField } from '../utils/validation-helper';
import { IInternalLinkedStructField } from '../schema/internal-schema';
import { IStoreState } from '../store';

interface IValidationResult {
  outputValue: {};
  errors: IErrors;
  touched: { [path: string]: boolean };
  hasErrors: boolean;
}

function validateBlock(
  state: IStoreState,
  structName: string,
  blockName: string,
  parentValue: object,
  parentPath?: string,
): IValidationResult {
  const outputValue = {};
  const errors: IErrors = {};
  const touched: { [path: string]: boolean } = {};
  let hasErrors = false;

  const blockReference = state.schema.blocks.get(structName).get(blockName);

  blockReference.fields.forEach((fieldReference) => {
    const { condition } = fieldReference;
    const field = state.schema.fields.get(structName).get(fieldReference.field);

    let fieldPath = field.name;

    if (parentPath) {
      fieldPath = `${parentPath}.${fieldPath}`;
    }

    if (condition({ path: fieldPath, parentValue, formValue: state.value })) {
      const fieldValue = parentValue[field.name];
      outputValue[field.name] = fieldValue;

      const initialFieldValue = formPathToValue(state.initialValue, fieldPath);
      const fieldErrors = validateField(
        state.schema,
        structName,
        field.name,
        fieldValue,
        initialFieldValue,
        state.value,
        parentValue,
        state.schema.customValidators,
        state.collectionReferences,
      );

      if (fieldErrors.length) {
        hasErrors = true;
      }

      errors[fieldPath] = fieldErrors;

      switch (field.type) {
        case 'linkedStruct':
          {
            const linkedStructField = field as IInternalLinkedStructField;
            const linkedStructValue = parentValue[field.name] as object[];

            if (linkedStructValue) {
              linkedStructValue.forEach((value, index) => {
                const itemPath = `${fieldPath}.${index}`;

                const result = validateBlock(
                  state,
                  linkedStructField.reference.struct,
                  linkedStructField.reference.block,
                  value,
                  itemPath,
                );

                Object.assign(errors, result.errors);
                Object.assign(touched, result.touched);

                outputValue[field.name][index] = result.outputValue;

                if (!hasErrors) {
                  ({ hasErrors } = result);
                }
              });
            }
          }
          break;
        default:
          break;
      }
    }

    if (
      typeof field.missingValue !== 'undefined' &&
      typeof outputValue[field.name] === 'undefined'
    ) {
      outputValue[field.name] = field.missingValue;
    }

    touched[fieldPath] = true;
  });

  return {
    errors,
    hasErrors,
    outputValue,
    touched,
  };
}

export default function formActions({ setState }) {
  return {
    submitForm: (
      state: IStoreState,
    ): Partial<IStoreState> | Promise<Partial<IStoreState>> => {
      const struct = state.schema.structs.find((x) => x.name === state.struct);
      const block = state.schema.blocks.get(state.struct).get(state.block);

      const result = validateBlock(state, struct.name, block.name, state.value);
      const { outputValue, errors, touched, hasErrors } = result;

      setState({
        childErrors: generateChildErrors(errors),
        errors,
        formSubmitting: !hasErrors,
        touched,
      });

      if (hasErrors) {
        return {};
      }

      return new Promise<Partial<IStoreState>>((resolve) => {
        state.onSubmit(outputValue, (submissionErrors) => {
          if (submissionErrors) {
            resolve({
              externalChildErrors: generateChildErrors(submissionErrors),
              externalErrors: submissionErrors,
              formSubmitting: false,
            });
            return;
          }

          resolve({
            externalChildErrors: {},
            externalErrors: {},
            formSubmitting: false,
          });
        });
      });
    },
  };
}
