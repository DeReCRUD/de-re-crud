import { h, Form } from '@de-re-crud/ui';
import { ISchemaJson } from '@de-re-crud/core';
import { Bootstrap4RendererOptions } from '@de-re-crud/theme-bootstrap4';
import { within } from '@testing-library/dom';
import { screen, render } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import schema from '../../../examples/schemas/person.json';

describe('LinkedStructRenderer', () => {
  it('should remove item from value', () => {
    const onFieldParentChange = jest.fn();
    const value = {
      children: [
        {
          firstName: 'John',
          lastName: 'Doe',
        },
        {
          firstName: 'Jane',
          lastName: 'Jane',
        },
      ],
    };

    render(
      <Form
        schema={schema as ISchemaJson}
        struct="person"
        initialValue={value}
        rendererOptions={Bootstrap4RendererOptions}
        onFieldParentChange={onFieldParentChange}
        onSubmit={jest.fn()}
      />,
    );

    const { getByRole } = within(screen.getByTestId('row-2'));
    // @ts-ignore
    userEvent.click(getByRole('button', { name: 'Remove' }));

    expect(onFieldParentChange).toHaveBeenCalledTimes(1);
    expect(onFieldParentChange).toHaveBeenCalledWith(
      expect.objectContaining({
        newValue: [value.children[0]],
      }),
    );
  });
});
