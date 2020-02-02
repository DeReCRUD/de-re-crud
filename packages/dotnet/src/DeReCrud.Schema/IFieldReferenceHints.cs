namespace DeReCrud.Schema
{
    public interface IFieldReferenceHints
    {
        int? Width { get; }
        ICustomHints Custom { get; }
    }
}