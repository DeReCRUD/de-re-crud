import { IErrors } from '../models/errors';
import { IBlock, ILinkedStructField, IStruct } from '../models/schema';
import { IStoreState } from '../store';
import formPathToValue from '../utils/form-path-to-value';
import generateChildErrors from '../utils/generate-child-errors';
import { validateField } from '../utils/validation-helper';

interface IValidationResult {
  outputValue: {};
  errors: IErrors;
  touched: { [path: string]: boolean };
  hasErrors: boolean;
}

function validateBlock(
  state: IStoreState,
  struct: IStruct,
  block: IBlock,
  parentValue: object,
  parentPath?: string
): IValidationResult {
  const outputValue = {};
  const errors: IErrors = {};
  const touched: { [path: string]: boolean } = {};
  let hasErrors = false;

  block.fields.forEach((fieldReference) => {
    const { field, condition } = fieldReference;

    let fieldPath = field.name;
    if (parentPath) {
      fieldPath = parentPath + '.' + fieldPath;
    }

    if (condition(parentValue, state.value)) {
      const fieldValue = parentValue[field.name];
      outputValue[field.name] = fieldValue;

      const initialFieldValue = formPathToValue(state.initialValue, fieldPath);
      const fieldErrors = validateField(
        struct,
        field,
        fieldValue,
        initialFieldValue,
        state.value,
        parentValue,
        state.schema.validators,
        state.schema.validatorMessages,
        state.collectionReferences
      );

      if (fieldErrors.length) {
        hasErrors = true;
      }

      errors[fieldPath] = fieldErrors;

      switch (field.type) {
        case 'linkedStruct':
          const linkedStructField = field as ILinkedStructField;
          const linkedStructValue = parentValue[field.name] as object[];

          if (linkedStructValue) {
            linkedStructValue.forEach((value, index) => {
              const itemPath = fieldPath + '.' + index;

              const result = validateBlock(
                state,
                linkedStructField.reference.struct,
                linkedStructField.reference.block,
                value,
                itemPath
              );

              Object.assign(errors, result.errors);
              Object.assign(touched, result.touched);

              outputValue[field.name][index] = result.outputValue;

              if (!hasErrors) {
                hasErrors = result.hasErrors;
              }
            });
          }
          break;
      }
    }

    if (
      field.hasOwnProperty('missingValue') &&
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
    touched
  };
}

export default function formActions({ setState }) {
  return {
    submitForm: (
      state: IStoreState
    ): Partial<IStoreState> | Promise<Partial<IStoreState>> => {
      const struct = state.schema.structs.find((x) => x.name === state.struct);
      const block = struct.blocks.find((x) => x.name === state.block);

      const result = validateBlock(state, struct, block, state.value);
      const { outputValue, errors, touched, hasErrors } = result;

      setState({
        childErrors: generateChildErrors(errors),
        errors,
        formSubmitting: !hasErrors,
        touched
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
              formSubmitting: false
            });
            return;
          }

          resolve({
            externalChildErrors: {},
            externalErrors: {},
            formSubmitting: false
          });
        });
      });
    }
  };
}
