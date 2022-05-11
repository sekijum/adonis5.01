import AppException from 'App/Shared/Exceptions/AppException'
import Locale from 'App/Models/Locale'
import { IDtoLocale } from 'App/Http/DTOs/IDtoLocale'

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ILocaleRepository {
    index(qs: Record<string, any>): Promise<Locale[]>
    store(locale: IDtoLocale): Promise<Locale>
    update(locale: Locale, dto: IDtoLocale): Promise<Locale>
    delete(locale: Locale): Promise<void>
}

export class ServiceLocale implements ILocaleRepository {
    public async index(qs: Record<string, any>): Promise<Locale[]> {
        const page = Number(qs.page || 1)
        const limit = Number(qs.limit || 20)
        return Locale.query().paginate(page, limit)
    }

    public async store(dto: IDtoLocale): Promise<Locale> {
        const { ...data } = dto
        try {
            const locale = await Locale.create(data)
            return locale
        } catch (err) {
            throw new AppException('Locale store is faild.', err)
        }
    }

    public async update(locale: Locale, dto: IDtoLocale): Promise<Locale> {
        const { ...data } = dto
        try {
            await locale.merge(data).save()
            return locale
        } catch (err) {
            throw new AppException('Locale update is faild.', err)
        }
    }

    public async delete(locale: Locale): Promise<void> {
        try {
            return locale.delete()
        } catch (err) {
            throw new AppException('Locale not found.', err)
        }
    }
}
