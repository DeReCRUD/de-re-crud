import { ILabel } from '../../../models/schema';
import parseLabel from '../../schema-parser/parse-label';

describe('parseLabel', () => {
  it('should return default label for falsy value', () => {
    expect(parseLabel()).toEqual({
      long: '',
      medium: '',
      short: '',
    } as ILabel);
  });

  it('should return label for string value', () => {
    expect(parseLabel('Label')).toEqual({
      long: 'Label',
      medium: 'Label',
      short: 'Label',
    } as ILabel);
  });

  it('should return label for short, medium, and long value', () => {
    expect(
      parseLabel({ long: 'Long', medium: 'Medium', short: 'Short' }),
    ).toEqual({
      long: 'Long',
      medium: 'Medium',
      short: 'Short',
    } as ILabel);
  });

  describe('short property', () => {
    it('should use medium value when short/long not specified', () => {
      expect(parseLabel({ medium: 'Medium' }).short).toBe('Medium');
    });

    it('should use long value when short/medium values not specified', () => {
      expect(parseLabel({ long: 'Long' }).short).toBe('Long');
    });

    it('should use empty value when short/medium/long values not specified', () => {
      expect(parseLabel({}).short).toBe('');
    });
  });

  describe('medium property', () => {
    it('should use short value when medium/long not specified', () => {
      expect(parseLabel({ short: 'Short' }).medium).toBe('Short');
    });

    it('should use long value when short/medium values not specified', () => {
      expect(parseLabel({ long: 'Long' }).medium).toBe('Long');
    });

    it('should use empty value when short/medium/long values not specified', () => {
      expect(parseLabel({}).medium).toBe('');
    });
  });

  describe('long property', () => {
    it('should use short value when medium/long not specified', () => {
      expect(parseLabel({ short: 'Short' }).long).toBe('Short');
    });

    it('should use medium value when short/long values not specified', () => {
      expect(parseLabel({ medium: 'Medium' }).long).toBe('Medium');
    });

    it('should use empty value when short/medium/long values not specified', () => {
      expect(parseLabel({}).long).toBe('');
    });
  });
});
