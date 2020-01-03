namespace DeReCrud.Schema
{
    public interface IDefaultValidatorMessages
    {
        string Keyword { get; }
        string MinLength { get; }
        string MaxLength { get; }
        string Min { get; }
        string Max { get; }
        string MinInstances { get; }
        string MaxInstances { get; }
        string Unique { get; }
        string Required { get; }
    }
}