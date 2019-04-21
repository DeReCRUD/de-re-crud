import { h, Ref } from 'preact';
import { cleanup, render } from 'preact-testing-library';
import Form from '../';
import { IFormConnectProps } from '../form.props';

const defaultSchema = {
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
          fields: ['name'],
        },
      ],
    },
  ],
};

function createComponent(
  props: Partial<IFormConnectProps> = {},
  refCallback: Ref<Form> = null,
) {
  return (
    <Form
      ref={refCallback}
      schema={defaultSchema}
      struct="struct"
      onSubmit={jest.fn()}
      {...props}
    />
  );
}

describe('Form', () => {
  afterEach(cleanup);

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
