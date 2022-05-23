import { ModelPaginatorContract, ModelObject } from '@ioc:Adonis/Lucid/Orm'
import JsonResource, { IPaginateProps } from './JsonResource'
import UserModel from 'App/Models/User'
import moment from 'moment'

export interface IUser {
    id: number
    firstName: string | null
    lastName: string | null
    type: string | null
    email: string | null
    deletedAt: string | null
    updatedAt: string | null
    createdAt: string | null
}

export class UserResource extends JsonResource {
    public normalizeArray(array: ModelPaginatorContract<UserModel>): IPaginateProps<IUser> {
        const { meta, data } = array.serialize() || array.toJSON()
        const normalizeData = data.map((obj) => this.returnObject(obj))
        return { meta, data: normalizeData }
    }

    public normalizeObject(obj): IUser {
        return this.returnObject(obj)
    }

    public returnObject(obj: ModelObject, format = 'L'): IUser {
        return {
            id: obj.id,
            firstName: obj.firstName,
            lastName: obj.lastName,
            type: obj.type,
            email: obj.email,
            deletedAt: moment(obj.deletedAt).format(format),
            createdAt: moment(obj.createdAt).format(format),
            updatedAt: moment(obj.updatedAt).format(format),
        }
    }
}

const userResource = new UserResource()
export default userResource
