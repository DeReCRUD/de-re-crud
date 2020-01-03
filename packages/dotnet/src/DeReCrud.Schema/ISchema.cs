using System.Collections.Generic;

namespace DeReCrud.Schema
{
    public interface ISchema
    {
        IEnumerable<IStruct> Structs { get; }
        IEnumerable<ICustomValidator> CustomValidators { get; }
        IDefaultValidatorMessages DefaultValidatorMessages { get; }
    }
}