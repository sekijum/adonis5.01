import { ModelPaginatorContract, ModelObject } from '@ioc:Adonis/Lucid/Orm'
import JsonResource, { IPaginateProps } from './JsonResource'
import LocaleModel from 'App/Models/Locale'
import moment from 'moment'

interface ILocale {
    id: number
    name: string | null
    originalName: string | null
    code: string | null
    updatedAt: string | null
    createdAt: string | null
}

export class LocaleResource extends JsonResource {
    public normalizeArray(array: ModelPaginatorContract<LocaleModel>): IPaginateProps<ILocale> {
        const { meta, data } = array.serialize() || array.toJSON()
        const normalizeData = data.map((obj) => this.returnObject(obj))
        return { meta, data: normalizeData }
    }

    public normalizeObject(obj: ModelObject): ILocale {
        return this.returnObject(obj)
    }

    public returnObject(obj: ModelObject, format = 'L'): ILocale {
        return {
            id: obj.id,
            name: obj.name,
            originalName: obj.originalName,
            code: obj.code,
            createdAt: moment(obj.createdAt).format(format),
            updatedAt: moment(obj.updatedAt).format(format),
        }
    }
}

const localeResource = new LocaleResource()
export default localeResource
