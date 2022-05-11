import AppException from 'App/Shared/Exceptions/AppException'
import Hoge from 'App/Models/Hoge'
import { IDtoHoge } from 'App/Http/DTOs/IDtoHoge'

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IHogeRepository {
    index(qs: Record<string, any>): Promise<Hoge[]>
    show(hoge: Hoge): Promise<Hoge | null>
    store(hoge: IDtoHoge): Promise<Hoge>
    update(hoge: Hoge, dto: IDtoHoge): Promise<Hoge>
    delete(hoge: Hoge): Promise<void>
}

export class ServiceHoge implements IHogeRepository {
    public async index(qs: Record<string, any>): Promise<Hoge[]> {
        const page = Number(qs.page || 1)
        const limit = Number(qs.limit || 20)
        return Hoge.query().preload('locales').paginate(page, limit)
    }

    public async show(hoge: Hoge): Promise<Hoge | null> {
        await hoge.load('locales')
        return hoge
    }

    public async store(dto: IDtoHoge): Promise<Hoge> {
        const { locales, ...data } = dto
        try {
            const hoge = await Hoge.create(data)
            await hoge.related('locales').updateOrCreateMany(locales, 'code')
            return hoge
        } catch (err) {
            throw new AppException('Hoge store is faild.', err)
        }
    }

    public async update(hoge: Hoge, dto: IDtoHoge): Promise<Hoge> {
        const { locales, ...data } = dto
        try {
            await hoge.related('locales').updateOrCreateMany(locales, 'code')
            return await hoge.merge(data).save()
        } catch (err) {
            throw new AppException('Hoge update is faild.', err)
        }
    }

    public async delete(hoge: Hoge): Promise<void> {
        try {
            return hoge.delete()
        } catch (err) {
            throw new AppException('Hoge not found.', err)
        }
    }
}
