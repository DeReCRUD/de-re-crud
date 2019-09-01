import { IBlock, IStamp, IBlockReference, IFieldReference } from '../..';
import { IBlockJson } from '../../json';
import parseBlock from '../parse-block';
import { DEFAULT_CONDITION } from '../parse-condition';

const struct = 'TestStruct';

describe('parseBlock', () => {
  let block: IBlock;
  let json: IBlockJson;

  beforeEach(() => {
    json = {
      name: 'block',
      references: [],
    };

    block = {
      name: json.name,
      struct,
      fields: [],
      references: [],
      hints: {
        custom: {},
        layout: 'vertical',
      },
      condition: DEFAULT_CONDITION,
    };
  });

  it('should return defaults when no overrides specified', () => {
    expect(parseBlock(struct, json)).toEqual(block);
  });

  it('should parse label override', () => {
    expect(
      parseBlock(struct, {
        ...json,
        label: 'Block',
      }),
    ).toEqual({
      ...block,
      label: {
        short: 'Block',
        medium: 'Block',
        long: 'Block',
      },
    } as IBlock);
  });

  it('should parse layout override', () => {
    expect(
      parseBlock(struct, {
        ...json,
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
    } as IBlock);
  });

  it('should parse stamp with default size', () => {
    json = {
      ...json,
      references: [
        {
          stamp: 'Stamp',
          condition: DEFAULT_CONDITION,
        },
      ],
    };

    expect(parseBlock(struct, json)).toEqual({
      ...block,
      references: [
        {
          text: 'Stamp',
          size: 3,
          blockInstance: 1,
          condition: DEFAULT_CONDITION,
          hints: {
            custom: {},
          },
        } as IStamp,
      ],
    } as IBlock);
  });

  it('should parse stamp with specified size', () => {
    json = {
      ...json,
      references: [
        {
          stamp: 'Stamp',
          size: 1,
          condition: DEFAULT_CONDITION,
        },
      ],
    };

    expect(parseBlock(struct, json)).toEqual({
      ...block,
      references: [
        {
          text: 'Stamp',
          size: 1,
          blockInstance: 1,
          condition: DEFAULT_CONDITION,
          hints: {
            custom: {},
          },
        } as IStamp,
      ],
    } as IBlock);
  });

  it('should parse simple field references', () => {
    json = {
      ...json,
      references: ['field1'],
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

    expect(parseBlock(struct, json)).toEqual({
      ...block,
      fields,
      references: fields,
    } as IBlock);
  });

  it('should parse complex field references', () => {
    json = {
      ...json,
      references: [
        {
          field: 'field1',
          condition: DEFAULT_CONDITION,
        },
      ],
    };

    const fields: IFieldReference[] = [
      {
        field: 'field1',
        condition: DEFAULT_CONDITION,
        hints: {
          custom: {},
        },
      },
    ];

    expect(parseBlock(struct, json)).toEqual({
      ...block,
      fields,
      references: fields,
    } as IBlock);
  });

  it('should parse block references', () => {
    json = {
      ...json,
      references: [
        {
          block: 'Block',
        },
      ],
    };

    expect(parseBlock(struct, json)).toEqual({
      ...block,
      references: [
        {
          block: 'Block',
        } as IBlockReference,
      ],
    } as IBlock);
  });

  it('should pass through custom hints', () => {
    json = {
      ...json,
      hints: {
        custom: {
          block: true,
        },
      },
      references: [
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

    const field: IFieldReference = {
      field: 'field1',
      condition: DEFAULT_CONDITION,
      hints: {
        custom: {
          field: true,
        },
      },
    };

    expect(parseBlock(struct, json)).toEqual({
      ...block,
      hints: {
        ...block.hints,
        custom: {
          block: true,
        },
      },
      fields: [field],
      references: [
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
        } as IStamp,
      ],
    } as IBlock);
  });
});
