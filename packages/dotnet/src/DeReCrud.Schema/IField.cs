namespace DeReCrud.Schema
{
    public interface IField
    {
        string Name { get; }
        ILabel Label { get; }
        FieldType Type { get; }
        bool KeyField { get; }
        bool Required { get; }
        bool Unique { get; }
        string Help { get; }
    }
}