import { StoreState, Errors, ChildErrors } from '../store';
import { validateField } from '../utils/validation-helper';
import { ILinkedStructField, IBlock } from '../models/schema';
import generateChildErrors from '@de-re-crud/forms/utils/generate-child-errors';
import { resolve } from 'url';

type ValidationResult = {
  errors: Errors;
  touched: { [path: string]: boolean };
  hasErrors: boolean;
};

function validateBlock(
  block: IBlock,
  formValue: any,
  parentValue: any,
  parentPath?: string
): ValidationResult {
  const errors: Errors = {};
  const touched: { [path: string]: boolean } = {};
  let hasErrors = false;

  block.fields.forEach(fieldReference => {
    const { field, condition } = fieldReference;

    let fieldPath = field.name;
    if (parentPath) {
      fieldPath = parentPath + '.' + fieldPath;
    }

    if (condition(parentValue, formValue)) {
      const fieldValue = parentValue[field.name];

      const fieldErrors = validateField(field, fieldValue);
      if (fieldErrors.length) {
        hasErrors = true;
      }

      errors[fieldPath] = fieldErrors;

      switch (field.type) {
        case 'linkedStruct':
          const linkedStructField = field as ILinkedStructField;
          const linkedStructValue = parentValue[field.name] as any[];

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

              if (!hasErrors) {
                hasErrors = result.hasErrors;
              }
            });
          }
          break;
      }
    }

    touched[fieldPath] = true;
  });

  return {
    errors,
    touched,
    hasErrors
  };
}

export default function formActions({ setState }) {
  return {
    submitForm: (state: StoreState): Partial<StoreState> | Promise<boolean> => {
      const struct = state.structs.find(x => x.name === state.struct);
      const block = struct.blocks.find(x => x.name == state.block);
      const formValue = state.value;

      const result = validateBlock(block, formValue, formValue);
      const { errors, touched, hasErrors } = result;

      setState({
        errors,
        childErrors: generateChildErrors(errors),
        touched,
        submitting: !hasErrors
      });

      if (hasErrors) {
        return {};
      }

      return new Promise(resolve => {
        state.onSubmit(formValue, errors => {
          if (errors) {
            setState({ errors, submitting: false });
            return;
          }

          setState({ submitting: false });
          resolve();
        });
      });
    }
  };
}
