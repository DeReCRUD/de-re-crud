namespace DeReCrud.Schema
{
    public interface IBlockHint
    {
        IBlockHint Layout { get; }
        ICustomHints Custom { get; }
    }
}