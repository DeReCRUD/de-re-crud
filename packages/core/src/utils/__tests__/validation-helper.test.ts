import { ILinkedStructField } from '../../schema';
import { validateLinkedStructField } from '../validation-helper';

describe('validationHelper', () => {
  describe('when validating linked struct fields', () => {
    it('should return no error if field is not required and value is nil', () => {
      const field: Partial<ILinkedStructField> = {
        required: false,
        minInstances: 0,
      };

      expect(
        validateLinkedStructField(field as ILinkedStructField, undefined),
      ).toEqual([]);
    });

    it('should return no error if field is not required and value is empty', () => {
      const field: Partial<ILinkedStructField> = {
        required: false,
        minInstances: 0,
      };

      expect(
        validateLinkedStructField(field as ILinkedStructField, []),
      ).toEqual([]);
    });

    it('should return error if field is required and value is empty', () => {
      const field: Partial<ILinkedStructField> = {
        required: true,
        minInstances: 0,
      };

      expect(
        validateLinkedStructField(field as ILinkedStructField, []),
      ).toEqual(['This field must have at least 1 item(s).']);
    });

    it('should return error if field has minimum instance limit and value is empty', () => {
      const field: Partial<ILinkedStructField> = {
        required: false,
        minInstances: 5,
      };

      expect(
        validateLinkedStructField(field as ILinkedStructField, []),
      ).toEqual(['This field must have at least 5 item(s).']);
    });
  });
});
