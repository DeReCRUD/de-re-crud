import { h } from '@de-re-crud/ui';
import { render } from '@testing-library/angular';
import { JsxHostComponent } from '../jsx-host.component';
import { JsxHostDirective } from '../jsx-host.directive';

describe('jsx host', () => {
  it('should render single JSX element', async () => {
    const { getByText } = await render(JsxHostComponent, {
      declarations: [JsxHostDirective],
      componentProperties: {
        formId: '1',
        element: <div>Single Element</div>,
      },
    });

    expect(getByText('Single Element'));
  });

  it('should render multiple JSX elements', async () => {
    const { getAllByText } = await render(JsxHostComponent, {
      declarations: [JsxHostDirective],
      componentProperties: {
        formId: '1',
        element: (
          <ul>
            <li>Element 1</li>
            <li>Element 2</li>
          </ul>
        ),
      },
    });

    const elements = getAllByText(/Element ([0-9])$/);

    expect(elements).toHaveLength(2);
    expect(elements.map((el) => el.textContent)).toEqual([
      'Element 1',
      'Element 2',
    ]);
  });
});
