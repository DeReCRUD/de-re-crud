import { ISchemaJson } from '@de-re-crud/core';
import { h, Ref } from 'preact';
import { cleanup, render } from 'preact-testing-library';
import Form, { IFormProps } from '..';

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
      ],
      blocks: [
        {
          name: 'default',
          references: ['name'],
        },
      ],
    },
  ],
};

function createComponent(
  props: Partial<IFormProps> = {},
  refCallback: Ref<Form> = null,
) {
  return (
    <Form
      ref={refCallback}
      schema={schema}
      struct="struct"
      onSubmit={jest.fn()}
      {...props}
    />
  );
}

describe('Form', () => {
  afterEach(cleanup);

  it('should return root value in store', () => {
    let instance: Form;

    const value = { struct: { name: 'Name' } };

    render(
      createComponent({ initialValue: value }, (form) => {
        instance = form;
      }),
    );

    expect(instance.getValue()).toEqual(value);
  });

  it('should update field value in store', () => {
    let instance: Form;

    render(
      createComponent({}, (form) => {
        instance = form;
      }),
    );

    instance.setValue('struct.name', 'Name');

    expect(instance.getValue('struct.name')).toBe('Name');
  });
});
