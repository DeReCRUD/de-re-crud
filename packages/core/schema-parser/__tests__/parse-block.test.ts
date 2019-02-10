import {
  IInternalBlock,
  IInternalStamp,
  IInternalBlockReference,
  IInternalFieldReference,
} from '../../internal-schema';
import parseBlock from '../parse-block';
import { DEFAULT_CONDITION } from '../parse-condition';

const structName = 'TestStruct';

describe('parseBlock', () => {
  let block: IInternalBlock = null;
  let blockJson: any = null;

  beforeEach(() => {
    blockJson = {
      struct: structName,
      name: 'block',
    };

    block = {
      name: blockJson.name,
      struct: structName,
      fields: [],
      items: [],
      hints: {
        custom: {},
        layout: 'vertical',
      },
      condition: DEFAULT_CONDITION,
    };
  });

  it('should return defaults when no overrides specified', () => {
    expect(parseBlock(structName, blockJson)).toEqual(block);
  });

  it('should parse label override', () => {
    expect(
      parseBlock(structName, {
        ...blockJson,
        label: 'Block',
      }),
    ).toEqual({
      ...block,
      label: {
        short: 'Block',
        medium: 'Block',
        long: 'Block',
      },
    } as IInternalBlock);
  });

  it('should parse layout override', () => {
    expect(
      parseBlock(structName, {
        ...blockJson,
        hints: {
          layout: 'horizontal',
        },
      }),
    ).toEqual({
      ...block,
      hints: {
        ...block.hints,
        layout: 'horizontal',
      },
    } as IInternalBlock);
  });

  it('should parse stamp with default size', () => {
    blockJson = {
      ...blockJson,
      fields: [
        {
          stamp: 'Stamp',
          condition: DEFAULT_CONDITION,
        },
      ],
    };

    expect(parseBlock(structName, blockJson)).toEqual({
      ...block,
      items: [
        {
          text: 'Stamp',
          size: 3,
          blockInstance: 1,
          condition: DEFAULT_CONDITION,
          hints: {
            custom: {},
          },
        } as IInternalStamp,
      ],
    } as IInternalBlock);
  });

  it('should parse stamp with specified size', () => {
    blockJson = {
      ...blockJson,
      fields: [
        {
          stamp: 'Stamp',
          size: 1,
          condition: DEFAULT_CONDITION,
        },
      ],
    };

    expect(parseBlock(structName, blockJson)).toEqual({
      ...block,
      items: [
        {
          text: 'Stamp',
          size: 1,
          blockInstance: 1,
          condition: DEFAULT_CONDITION,
          hints: {
            custom: {},
          },
        } as IInternalStamp,
      ],
    } as IInternalBlock);
  });

  it('should parse simple field references', () => {
    blockJson = {
      ...blockJson,
      fields: ['field1'],
    };

    const fields = [
      {
        field: 'field1',
        condition: DEFAULT_CONDITION,
        hints: {
          custom: {},
        },
      },
    ];

    expect(parseBlock(structName, blockJson)).toEqual({
      ...block,
      fields,
      items: fields,
    } as IInternalBlock);
  });

  it('should parse complex field references', () => {
    blockJson = {
      ...blockJson,
      fields: [
        {
          field: 'field1',
          condition: DEFAULT_CONDITION,
        },
      ],
    };

    const fields: IInternalFieldReference[] = [
      {
        field: 'field1',
        condition: DEFAULT_CONDITION,
        hints: {
          custom: {},
        },
      },
    ];

    expect(parseBlock(structName, blockJson)).toEqual({
      ...block,
      fields,
      items: fields,
    } as IInternalBlock);
  });

  it('should parse block references', () => {
    blockJson = {
      ...blockJson,
      fields: [
        {
          block: 'Block',
        },
      ],
    };

    expect(parseBlock(structName, blockJson)).toEqual({
      ...block,
      items: [
        {
          block: 'Block',
        } as IInternalBlockReference,
      ],
    } as IInternalBlock);
  });

  it('should pass through custom hints', () => {
    blockJson = {
      ...blockJson,
      hints: {
        custom: {
          block: true,
        },
      },
      fields: [
        {
          field: 'field1',
          condition: DEFAULT_CONDITION,
          hints: {
            custom: {
              field: true,
            },
          },
        },
        {
          stamp: 'Stamp',
          size: 1,
          condition: DEFAULT_CONDITION,
          hints: {
            custom: {
              stamp: true,
            },
          },
        },
      ],
    };

    const field: IInternalFieldReference = {
      field: 'field1',
      condition: DEFAULT_CONDITION,
      hints: {
        custom: {
          field: true,
        },
      },
    };

    expect(parseBlock(structName, blockJson)).toEqual({
      ...block,
      hints: {
        ...block.hints,
        custom: {
          block: true,
        },
      },
      fields: [field],
      items: [
        field,
        {
          text: 'Stamp',
          size: 1,
          blockInstance: 1,
          condition: DEFAULT_CONDITION,
          hints: {
            custom: {
              stamp: true,
            },
          },
        } as IInternalStamp,
      ],
    } as IInternalBlock);
  });
});
