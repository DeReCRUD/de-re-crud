import { IInternalBlock, IInternalStamp } from '../../internal-schema';
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

  it('should parse stamp with default size', () => {
    blockJson = {
      ...blockJson,
      fields: [
        {
          stamp: 'Stamp',
          size: 3,
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
});
