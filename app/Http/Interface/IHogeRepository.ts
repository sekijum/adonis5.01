import Hoge from 'App/Models/Hoge'
import { IDtoHoge } from 'App/Http/DTOs/IDtoHoge'

// eslint-disable-next-line @typescript-eslint/naming-convention
export default interface IHogeRepository {
    list(qs: Record<string, any>): Promise<Hoge[]>
    show(hoge: Hoge): Promise<Hoge | null>
    store(hoge: IDtoHoge): Promise<Hoge>
    update(hoge: Hoge, dto: IDtoHoge): Promise<Hoge>
    delete(hoge: Hoge): Promise<void>
}