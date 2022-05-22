import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Hoge from 'App/Models/Hoge'
import { IDtoHoge } from 'App/Http/DTOs/IDtoHoge'

// eslint-disable-next-line @typescript-eslint/naming-convention
export default interface IHogeRepository {
    list(qs: Record<string, any>): Promise<ModelPaginatorContract<Hoge>>
    store(hoge: IDtoHoge): Promise<Hoge>
    update(hoge: Hoge, dto: IDtoHoge): Promise<Hoge>
    delete(hoge: Hoge): Promise<void>
}
