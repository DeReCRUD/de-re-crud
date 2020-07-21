import { ISchemaJson } from '@de-re-crud/core';
import { h, Ref, Form, IFormProps } from '@de-re-crud/ui';
import { Bootstrap4RendererOptions } from '@de-re-crud/theme-bootstrap4';
import { render, fireEvent, wait } from '@testing-library/preact';

const schema: ISchemaJson = {
  structs: [
    {
      name: 'struct',
      label: 'Struct',
      collectionLabel: 'Structs',
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'keyword',
          required: true,
          keyField: true,
        },
        {
          name: 'structs',
          label: 'Structs',
          type: 'linkedStruct',
          required: true,
          reference: {
            struct: 'struct',
            labelField: 'name',
          },
          hints: {
            layout: 'inline',
          },
        },
      ],
      blocks: [
        {
          name: 'default',
          references: ['name', 'structs'],
        },
      ],
    },
  ],
};

function setup(props: Partial<IFormProps> = {}, refCallback: Ref<Form> = null) {
  const utils = render(
    <Form
      ref={refCallback}
      schema={schema}
      struct="struct"
      rendererOptions={Bootstrap4RendererOptions}
      onSubmit={jest.fn()}
      {...props}
    />,
  );

  const result = {
    ...utils,
    getNameInput: () => utils.getByPlaceholderText('Name'),
    setNameInput: (value: string) => {
      fireEvent.input(result.getNameInput(), { target: { value } });
      fireEvent.blur(result.getNameInput());
    },
    submit: () => {
      fireEvent.click(utils.getByText('Create Struct'));
    },
  };

  return result;
}

describe('Form', () => {
  it('should return root value', () => {
    let instance: Form;

    const { setNameInput } = setup(undefined, (form) => {
      instance = form;
    });

    setNameInput('test');

    expect(instance.getValue()).toEqual({ name: 'test' });
  });

  it('should update input value', () => {
    let instance: Form;

    const { setNameInput } = setup(undefined, (form) => {
      instance = form;
    });

    setNameInput('test');

    instance.setValue('name', 'test2');

    expect(instance.getValue('name')).toEqual('test2');
  });

  describe('errors', () => {
    it('should display when input is invalid and then disappear when input is valid', () => {
      const { setNameInput, getByTestId, queryByTestId } = setup();

      setNameInput('');

      expect(getByTestId('field-error')).toBeInTheDocument();

      setNameInput('test');

      expect(queryByTestId('field-error')).toBeNull();
    });

    it('should display when form is submitted and inputs are invalid', () => {
      const { submit, getAllByTestId } = setup();

      submit();

      expect(getAllByTestId('field-error')).toHaveLength(2);
    });

    it('should clear when valid input value is set manually', async () => {
      let instance: Form;

      const { setNameInput, getByTestId, queryByTestId } = setup(
        undefined,
        (form) => {
          instance = form;
        },
      );

      setNameInput('');

      expect(getByTestId('field-error')).toBeInTheDocument();

      instance.setValue('name', 'test');

      await wait(() => {
        expect(queryByTestId('field-error')).toBeNull();
      });
    });
  });
});
