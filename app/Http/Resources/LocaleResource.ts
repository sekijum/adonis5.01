import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Locale from 'App/Models/Locale'
import moment from 'moment'

export default class LocaleResource {
    static normalizeData(request: ModelPaginatorContract<Locale>, format = 'L'): any {
        let { data, meta } = request.serialize() || request.toJSON()

        data = data.map((obj) => ({
            id: obj.id,
            name: obj.name,
            originalName: obj.originalName,
            code: obj.code,
            createdAt: moment(obj.createdAt).format(format),
            updatedAt: moment(obj.updatedAt).format(format),
        }))

        return { data, meta }
    }
}
