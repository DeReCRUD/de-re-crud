namespace DeReCrud.Schema
{
    public interface IStampReference : IConditionalBlockReference
    {
        string Stamp { get; }
        StampSize? Size { get; }
        string Condition { get; }
        ICustomHints Hints { get; }
    }
}