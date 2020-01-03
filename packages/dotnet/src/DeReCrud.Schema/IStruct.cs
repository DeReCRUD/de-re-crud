using System.Collections.Generic;

namespace DeReCrud.Schema
{
    public interface IStruct
    {
        string Name { get; }
        ILabel Label { get; }
        ILabel CollectionLabel { get; }
        IEnumerable<IField> Fields { get; }
        IEnumerable<IBlock> Blocks { get; }
    }
}