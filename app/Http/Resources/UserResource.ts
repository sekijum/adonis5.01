import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import moment from 'moment'

export default class HogeResource {
    static normalizeData(request: ModelPaginatorContract<User>, format = 'L'): any {
        let { data, meta } = request.serialize() || request.toJSON()

        data = data.map((obj) => ({
            id: obj.id,
            firstName: obj.firstName,
            lastName: obj.lastName,
            type: obj.type,
            email: obj.email,
            deletedAt: moment(obj.deletedAt).format(format),
            createdAt: moment(obj.createdAt).format(format),
            updatedAt: moment(obj.updatedAt).format(format),
        }))

        return { data, meta }
    }
}
