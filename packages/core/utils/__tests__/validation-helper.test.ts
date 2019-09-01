import { IInternalLinkedStructField } from '../../schema/internal-schema';
import { validateLinkedStructField } from '../validation-helper';

describe('validationHelper', () => {
  describe('when validating linked struct fields', () => {
    it('should return no error if field is not required and value is nil', () => {
      const field: Partial<IInternalLinkedStructField> = {
        required: false,
        minInstances: 0,
      };

      expect(
        validateLinkedStructField(
          field as IInternalLinkedStructField,
          undefined,
        ),
      ).toEqual([]);
    });

    it('should return no error if field is not required and value is empty', () => {
      const field: Partial<IInternalLinkedStructField> = {
        required: false,
        minInstances: 0,
      };

      expect(
        validateLinkedStructField(field as IInternalLinkedStructField, []),
      ).toEqual([]);
    });

    it('should return error if field is required and value is empty', () => {
      const field: Partial<IInternalLinkedStructField> = {
        required: true,
        minInstances: 0,
      };

      expect(
        validateLinkedStructField(field as IInternalLinkedStructField, []),
      ).toEqual(['This field must have at least 1 item(s).']);
    });

    it('should return error if field has minimum instance limit and value is empty', () => {
      const field: Partial<IInternalLinkedStructField> = {
        required: false,
        minInstances: 5,
      };

      expect(
        validateLinkedStructField(field as IInternalLinkedStructField, []),
      ).toEqual(['This field must have at least 5 item(s).']);
    });
  });
});
