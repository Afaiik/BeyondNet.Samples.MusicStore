export interface IAsyncReadRepository<TEntity, TType> {
  GetAllAsync(): Promise<Array<TEntity>>;

  GetByIdAsync(id: TType): Promise<TEntity>;
}
