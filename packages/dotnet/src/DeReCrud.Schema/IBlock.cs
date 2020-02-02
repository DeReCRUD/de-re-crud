using System.Collections.Generic;

namespace DeReCrud.Schema
{
    public interface IBlock
    {
        string Name { get; }
        ILabel Label { get; }
        string Condition { get; }
        IEnumerable<IConditionalBlockReference> References { get; }
        IBlockHint Hints { get; }
    }
}