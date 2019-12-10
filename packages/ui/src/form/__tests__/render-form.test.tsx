import { ISchemaJson } from '@de-re-crud/core';
import { cleanup } from 'preact-testing-library';
import Form, { renderForm, IForm, IFormProps } from '..';

const render = jest.spyOn(Form.prototype, 'render');

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

function createForm(
  container: Element,
  props: Partial<IFormProps> = {},
): IForm {
  return renderForm(
    {
      schema,
      struct: 'struct',
      onSubmit: jest.fn(),
      ...props,
    },
    container,
  );
}

describe('renderForm', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(cleanup);

  it('should render form', () => {
    createForm(container);

    expect(render).toHaveBeenCalledTimes(1);
  });

  it('should call reEvaluateConditionson instance', () => {
    const reEvaluateConditions = jest.spyOn(
      Form.prototype,
      'reEvaluateConditions',
    );

    const form = createForm(container);

    form.reEvaluateConditions();

    expect(reEvaluateConditions).toHaveBeenCalledTimes(1);
  });

  it('should call setValue on instance', () => {
    const setValue = jest.spyOn(Form.prototype, 'setValue');

    const form = createForm(container);

    form.setValue('path', 'value');

    expect(setValue).toHaveBeenCalledWith('path', 'value', undefined);
  });

  it('should call setValue on instance with errors', () => {
    const setValue = jest.spyOn(Form.prototype, 'setValue');

    const form = createForm(container);

    form.setValue('path', 'value', ['error']);

    expect(setValue).toHaveBeenCalledWith('path', 'value', ['error']);
  });

  it('should call setErrors on instance', () => {
    const setValue = jest.spyOn(Form.prototype, 'setErrors');

    const form = createForm(container);

    form.setErrors('path', ['error']);

    expect(setValue).toHaveBeenCalledWith('path', ['error']);
  });
});
