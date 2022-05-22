import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import { IDtoUser, IDtorenewPassword } from 'App/Http/DTOs/IDtoUser'

// eslint-disable-next-line @typescript-eslint/naming-convention
export default interface IUserRepository {
    list(qs: Record<string, any>): Promise<ModelPaginatorContract<User>>
    store(data: IDtoUser): Promise<User>
    update(user: User, dto: IDtoUser): Promise<User>
    renewPassword(user: User, dto: IDtorenewPassword): Promise<User>
    delete(user: User): Promise<void>
}
