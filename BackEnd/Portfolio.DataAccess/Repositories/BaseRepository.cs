using Microsoft.EntityFrameworkCore;

namespace Portfolio.DataAccess.Repositories
{
    public class BaseRepository<TEntity>(PortfolioDbContext context)
        : IRepository<TEntity> where TEntity : class
    {
        protected PortfolioDbContext Context { get; } = context;

        protected IQueryable<TEntity> GetAllAsQueryable() => Context.Set<TEntity>();

        public async Task<TEntity> GetByIdAsync(int id)
        {
            var entity = await Context.Set<TEntity>().FindAsync(id);
            if (entity == null)
                throw new Exception($"Entity with id {id} not found.");
            return entity;
        }

        public async Task<List<TEntity>> GetAllAsync()
        {
            return await Context.Set<TEntity>().ToListAsync();
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            await Context.Set<TEntity>().AddAsync(entity);
            await Context.SaveChangesAsync();
            return entity;
        }

        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            Context.Set<TEntity>().Update(entity);
            await Context.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await Context.Set<TEntity>().FindAsync(id);
            if (entity == null)
                throw new Exception($"Entity with id {id} not found.");
            Context.Set<TEntity>().Remove(entity);
            await Context.SaveChangesAsync();
        }
    }
}
