import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import AppException from 'App/Exceptions/AppException'
import AuthorizationException from 'App/Exceptions/AuthorizationException'
import User from 'App/Models/User'
import { IDtoUser, IDtorenewPassword } from 'App/Http/DTOs/IDtoUser'
import { USERTYPES } from 'App/Constants/User'
import IUserRepository from 'App/Http/Interface/IUserRepository'
import UserResource from 'App/Http/Resources/UserResource'

export class ServiceUser implements IUserRepository {
    public async list(qs: Record<string, any>): Promise<ModelPaginatorContract<User>> {
        const page = Number(qs.page || 1)
        const limit = Number(qs.limit || 20)
        const data = await User.query().paginate(page, limit)
        return UserResource.normalizeData(data)
    }

    public async store(data: IDtoUser): Promise<User> {
        try {
            return User.create({
                ...data,
                type: USERTYPES.MEMBER,
            })
        } catch (err) {
            throw new AppException('User store is faild.', err)
        }
    }

    public async update(user: User, data: IDtoUser): Promise<User> {
        try {
            user.merge(data)
            return user.save()
        } catch (err) {
            throw new AppException('User update is faild.', err)
        }
    }

    public async renewPassword(user: User, dto: IDtorenewPassword): Promise<User> {
        const { password, oldPassword } = dto
        if (!(await Hash.verify(user.password, oldPassword))) {
            throw new AuthorizationException('Old password is not correct.')
        }
        try {
            user.password = password
            return user.save()
        } catch (err) {
            throw new AppException('User update  passwordis faild.', err)
        }
    }

    public async delete(user: User): Promise<void> {
        try {
            return user.softDelete()
        } catch (err) {
            throw new AppException('User not found.', err)
        }
    }
}

const serviceUser = new ServiceUser()
export default serviceUser
