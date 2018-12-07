import { IInternalBlock } from '../../internal-schema';
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
        layout: 'vertical',
      },
      condition: DEFAULT_CONDITION,
    };
  });

  it('should return defaults when no overrides specified', () => {
    expect(parseBlock(structName, blockJson)).toEqual(block);
  });
});
