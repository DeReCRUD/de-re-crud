namespace DeReCrud.Schema
{
    public interface IFieldReference : IConditionalBlockReference
    {
        string Field { get; }
        string Condition { get; }
    }
}