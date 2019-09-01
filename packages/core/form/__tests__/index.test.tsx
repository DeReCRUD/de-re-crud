import { h, Ref } from 'preact';
import { cleanup, render } from 'preact-testing-library';
import { ISchema } from '../../schema';
import { IFormConnectProps } from '../form.props';
import Form from '..';

const schema: ISchema = {
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
  props: Partial<IFormConnectProps> = {},
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
