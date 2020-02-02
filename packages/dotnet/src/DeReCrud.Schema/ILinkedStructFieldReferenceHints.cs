namespace DeReCrud.Schema
{
    public interface ILinkedStructFieldReferenceHints : IFieldReferenceHints
    {
        LinkedStructFieldLayout Layout { get; }
        string Block { get; }
    }
}