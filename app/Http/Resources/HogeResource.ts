import { ModelPaginatorContract, ModelObject } from '@ioc:Adonis/Lucid/Orm'
import JsonResource, { IPaginateProps } from './JsonResource'
import hogeLocaleResource, { IHogeLocale } from './Locale/HogeLocaleResource'
import HogeLocaleModel from 'App/Models/HogeLocale'
import moment from 'moment'

export interface IHoge {
    id: number
    name: string | null
    locales: IHogeLocale[] | []
    createdAt: string | null
    updatedAt: string | null
}

export class HogeResource extends JsonResource {
    public normalizeArray(array: ModelPaginatorContract<HogeLocaleModel>): IPaginateProps<IHoge> {
        const { meta, data } = array.serialize() || array.toJSON()
        const normalizeData = data.map((obj) => this.returnObject(obj))
        return { meta, data: normalizeData }
    }

    public normalizeObject(obj: ModelObject): IHoge {
        return this.returnObject(obj)
    }

    public returnObject(obj: ModelObject, format = 'L'): IHoge {
        return {
            id: obj.id,
            name: obj.name,
            locales: hogeLocaleResource.normalizeArray(obj.locales),
            createdAt: moment(obj.createdAt).format(format),
            updatedAt: moment(obj.updatedAt).format(format),
        }
    }
}

const hogeResource = new HogeResource()
export default hogeResource
