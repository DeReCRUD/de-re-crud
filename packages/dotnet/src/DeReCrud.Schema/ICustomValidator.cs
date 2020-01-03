using System.Text.RegularExpressions;

namespace DeReCrud.Schema
{
    public interface ICustomValidator
    {
        string Name { get; }
        string Pattern { get; }
        string Message { get; }
        bool Negate { get; }
    }
}