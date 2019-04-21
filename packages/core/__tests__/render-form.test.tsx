import { cleanup } from 'preact-testing-library';
import { renderForm, IForm, IFormProps } from '../';
import Form from '../form';

const render = jest.spyOn(Form.prototype, 'render');

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

function createForm(
  container: Element,
  props: Partial<IFormProps> = {},
): IForm {
  return renderForm(
    {
      schema: defaultSchema,
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

    expect(setValue).toHaveBeenCalledWith('path', 'value');
  });
});
