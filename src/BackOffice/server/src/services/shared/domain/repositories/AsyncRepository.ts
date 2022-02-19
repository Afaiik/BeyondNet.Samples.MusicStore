import { IAsyncReadRepository } from './AsyncReadRepository';

export interface IAsyncRepository<TEntity, TType>
  extends IAsyncReadRepository<TEntity, TType> {
  CreateAsync(entity: TEntity): Promise<TEntity>;

  UpdateAsync(entity: TEntity): Promise<void>;

  DeleteAsync(entity: TEntity): Promise<void>;
}
