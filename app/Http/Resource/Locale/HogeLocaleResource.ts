import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import JsonResource from '../JsonResource'
import moment from 'moment'

export interface IHogeLocale {
    id: number
    hogeId: number | null
    name: string | null
    type: string | null
    code: string | null
    createdAt: string | null
    updatedAt: string | null
}

export class HogeLocaleResource extends JsonResource {
    public normalizeArray(array: ModelObject[]): IHogeLocale[] {
        return array.map((obj) => this.returnObject(obj))
    }

    public normalizeObject(obj: ModelObject): IHogeLocale {
        return this.returnObject(obj)
    }

    public returnObject(obj: ModelObject, format = 'L'): IHogeLocale {
        return {
            id: obj.id,
            hogeId: obj.hogeId,
            name: obj.name,
            type: obj.type,
            code: obj.code,
            createdAt: moment(obj.createdAt).format(format),
            updatedAt: moment(obj.updatedAt).format(format),
        }
    }
}

const hogeLocaleResource = new HogeLocaleResource()
export default hogeLocaleResource
