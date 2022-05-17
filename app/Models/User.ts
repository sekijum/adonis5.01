import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, beforeFind, beforeFetch } from '@ioc:Adonis/Lucid/Orm'
import { softDelete, softDeleteQuery } from 'App/Shared/SoftDelete'

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public firstName: string

    @column()
    public lastName: string

    @column()
    public type: string

    @column()
    public email: string

    @column({ serializeAs: null })
    public password: string

    @column()
    public rememberMeToken: string

    @column.dateTime()
    public deletedAt: DateTime

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @beforeFind()
    public static softDeletesFind = softDeleteQuery

    @beforeFetch()
    public static softDeletesFetch = softDeleteQuery

    public async softDelete() {
        await softDelete(this)
    }

    @beforeSave()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password)
        }
    }
}
