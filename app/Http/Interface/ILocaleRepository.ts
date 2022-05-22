import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Locale from 'App/Models/Locale'
import { IDtoLocale } from 'App/Http/DTOs/IDtoLocale'

// eslint-disable-next-line @typescript-eslint/naming-convention
export default interface ILocaleRepository {
    list(qs: Record<string, any>): Promise<ModelPaginatorContract<Locale>>
    store(locale: IDtoLocale): Promise<Locale>
    update(locale: Locale, dto: IDtoLocale): Promise<Locale>
    delete(locale: Locale): Promise<void>
}
