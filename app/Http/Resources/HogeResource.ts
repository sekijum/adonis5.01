import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Hoge from 'App/Models/Hoge'
import moment from 'moment'

export default class HogeResource {
    static normalizeData(request: ModelPaginatorContract<Hoge>, format = 'L'): any {
        let { data, meta } = request.serialize() || request.toJSON()

        data = data.map((obj) => ({
            id: obj.id,
            name: obj.name,
            createdAt: moment(obj.createdAt).format(format),
            updatedAt: moment(obj.updatedAt).format(format),
        }))

        return { data, meta }
    }
}
