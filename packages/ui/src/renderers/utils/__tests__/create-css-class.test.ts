import createCssClass from '../create-css-class';

describe('createCssClass', () => {
  it('should create class with prefix', () => {
    expect(createCssClass('root', 'nested', 'class')).toBe('root-nested-class');
  });
});
