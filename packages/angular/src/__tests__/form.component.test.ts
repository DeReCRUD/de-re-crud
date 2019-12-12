import { render } from '@testing-library/angular';
import { ISchemaJson } from '@de-re-crud/core/dist/src';
import userEvent from '@testing-library/user-event';
import { Bootstrap4RendererOptions } from '@de-re-crud/theme-bootstrap4';
import { FormComponent } from '../form.component';
import { JsxHostDirective } from '../jsx-host.directive';

const schema: ISchemaJson = {
  structs: [
    {
      name: 'struct',
      label: 'Struct',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Text',
        },
      ],
      blocks: [
        {
          name: 'default',
          references: [
            {
              field: 'text',
            },
          ],
        },
      ],
    },
  ],
};

describe('form component', () => {
  it('should render valid form', async () => {
    const mockSubmit = jest.fn();

    const { getByPlaceholderText, getByText } = await render(FormComponent, {
      declarations: [JsxHostDirective],
      componentProperties: {
        schema,
        struct: 'struct',
        rendererOptions: Bootstrap4RendererOptions,
        submitted: {
          emit: mockSubmit,
        } as any,
      },
    });

    await userEvent.type(getByPlaceholderText('Text'), 'Test value');
    userEvent.click(getByText('Create Struct'));

    expect(mockSubmit).toHaveBeenCalledWith({
      onComplete: expect.any(Function),
      value: { text: 'Test value' },
    });
  });
});
