using System.Linq.Expressions;

namespace Resoluti.Application.Interfaces.Repositories
{
    public interface IGenericRepositoryAsync<T> where T : class
    {
        Task<T> GetByIdAsync(int id);
        Task<T> GetByGUIDAsync(Guid id);
        Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);
        IQueryable<T> Where(Expression<Func<T, bool>> predicate);
        Task<IReadOnlyList<T>> GetAllAsync();
        Task<IReadOnlyList<T>> GetPagedReponseAsync(int pageNumber, int pageSize);
        Task<T> AddAsync(T entity);
        Task<IEnumerable<T>> AddRangeAsync(IEnumerable<T> entitys);
        Task UpdateAsync(T entity);
        Task UpdateAsync(Action<T> setter, Func<T, bool> equater);
        Task DeleteAsync(T entity);
        Task DeleteAsync(Func<T, bool> equater);
        Task<bool> Any(Expression<Func<T, bool>> equater);

    }
}
