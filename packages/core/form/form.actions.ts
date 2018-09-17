import { IErrors } from '../models/errors';
import { IBlock, ILinkedStructField } from '../models/schema';
import { IStoreState } from '../store';
import generateChildErrors from '../utils/generate-child-errors';
import { validateField } from '../utils/validation-helper';

interface IValidationResult {
  outputValue: {};
  errors: IErrors;
  touched: { [path: string]: boolean };
  hasErrors: boolean;
}

function validateBlock(
  block: IBlock,
  formValue: object,
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

    if (condition(parentValue, formValue)) {
      const fieldValue = parentValue[field.name];
      outputValue[field.name] = fieldValue;

      const fieldErrors = validateField(field, fieldValue);
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
                linkedStructField.reference.block,
                formValue,
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
    ): Partial<IStoreState> | Promise<boolean> => {
      const struct = state.structs.find((x) => x.name === state.struct);
      const block = struct.blocks.find((x) => x.name === state.block);
      const formValue = state.value;

      const result = validateBlock(block, formValue, formValue);
      const { outputValue, errors, touched, hasErrors } = result;

      setState({
        childErrors: generateChildErrors(errors),
        errors,
        submitting: !hasErrors,
        touched
      });

      if (hasErrors) {
        return {};
      }

      return new Promise((resolve) => {
        state.onSubmit(outputValue, (submissionErrors) => {
          if (submissionErrors) {
            setState({ submissionErrors, submitting: false });
            return;
          }

          setState({ submitting: false });
          resolve();
        });
      });
    }
  };
}
