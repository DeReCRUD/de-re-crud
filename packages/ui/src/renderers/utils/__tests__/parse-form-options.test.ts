import parseFormOptions from '../parse-form-options';
import NoopRenderer from '../noop-renderer';

const GlobalCustomRenderer = () => NoopRenderer();
const LocalCustomRenderer = () => NoopRenderer();

describe('parseFormOptions', () => {
  describe('renderers', () => {
    it('should override default', () => {
      const { renderers } = parseFormOptions(
        {
          renderers: {
            button: GlobalCustomRenderer as any,
          },
        },
        {
          renderers: {
            button: LocalCustomRenderer as any,
          },
        },
      );

      expect(renderers.button).toEqual(LocalCustomRenderer);
    });

    it('should use default from global options', () => {
      const { renderers } = parseFormOptions(
        {
          renderers: {
            button: GlobalCustomRenderer as any,
          },
        },
        {},
      );

      expect(renderers.button).toEqual(GlobalCustomRenderer);
    });
  });
});
