import {
  IInternalBlock,
  IInternalStamp,
  IInternalBlockReference,
  IInternalFieldReference,
} from '../../internal-schema';
import { IBlock } from '../..';
import parseBlock from '../parse-block';
import { DEFAULT_CONDITION } from '../parse-condition';

const struct = 'TestStruct';

describe('parseBlock', () => {
  let result: IInternalBlock;
  let block: IBlock;

  beforeEach(() => {
    block = {
      name: 'block',
      references: [],
    };

    result = {
      name: block.name,
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
    expect(parseBlock(struct, block)).toEqual(result);
  });

  it('should parse label override', () => {
    expect(
      parseBlock(struct, {
        ...block,
        label: 'Block',
      }),
    ).toEqual({
      ...result,
      label: {
        short: 'Block',
        medium: 'Block',
        long: 'Block',
      },
    } as IInternalBlock);
  });

  it('should parse layout override', () => {
    expect(
      parseBlock(struct, {
        ...block,
        hints: {
          layout: 'horizontal',
        },
      }),
    ).toEqual({
      ...result,
      hints: {
        ...result.hints,
        layout: 'horizontal',
      },
    } as IInternalBlock);
  });

  it('should parse stamp with default size', () => {
    block = {
      ...block,
      references: [
        {
          stamp: 'Stamp',
          condition: DEFAULT_CONDITION,
        },
      ],
    };

    expect(parseBlock(struct, block)).toEqual({
      ...result,
      references: [
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
    block = {
      ...block,
      references: [
        {
          stamp: 'Stamp',
          size: 1,
          condition: DEFAULT_CONDITION,
        },
      ],
    };

    expect(parseBlock(struct, block)).toEqual({
      ...result,
      references: [
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
    block = {
      ...block,
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

    expect(parseBlock(struct, block)).toEqual({
      ...result,
      fields,
      references: fields,
    } as IInternalBlock);
  });

  it('should parse complex field references', () => {
    block = {
      ...block,
      references: [
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

    expect(parseBlock(struct, block)).toEqual({
      ...result,
      fields,
      references: fields,
    } as IInternalBlock);
  });

  it('should parse block references', () => {
    block = {
      ...block,
      references: [
        {
          block: 'Block',
        },
      ],
    };

    expect(parseBlock(struct, block)).toEqual({
      ...result,
      references: [
        {
          block: 'Block',
        } as IInternalBlockReference,
      ],
    } as IInternalBlock);
  });

  it('should pass through custom hints', () => {
    block = {
      ...block,
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

    const field: IInternalFieldReference = {
      field: 'field1',
      condition: DEFAULT_CONDITION,
      hints: {
        custom: {
          field: true,
        },
      },
    };

    expect(parseBlock(struct, block)).toEqual({
      ...result,
      hints: {
        ...result.hints,
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
        } as IInternalStamp,
      ],
    } as IInternalBlock);
  });
});
