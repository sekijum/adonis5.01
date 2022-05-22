import AppException from 'App/Exceptions/AppException'
import Locale from 'App/Models/Locale'
import { IDtoLocale } from 'App/Http/DTOs/IDtoLocale'
import ILocaleRepository from 'App/Http/Interface/ILocaleRepository'
import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import LocaleResource from 'App/Http/Resources/LocaleResource'

export class ServiceLocale implements ILocaleRepository {
    public async list(qs: Record<string, any>): Promise<ModelPaginatorContract<Locale>> {
        const page = Number(qs.page || 1)
        const limit = Number(qs.limit || 20)
        const data = await Locale.query().paginate(page, limit)
        return LocaleResource.normalizeData(data)
    }

    public async store(data: IDtoLocale): Promise<Locale> {
        try {
            const locale = await Locale.create(data)
            return locale
        } catch (err) {
            throw new AppException('Locale store is faild.', err)
        }
    }

    public async update(locale: Locale, data: IDtoLocale): Promise<Locale> {
        try {
            return await locale.merge(data).save()
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

const serviceLocale = new ServiceLocale()
export default serviceLocale
