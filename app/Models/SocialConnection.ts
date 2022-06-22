import { DateTime } from 'luxon'
import User from './User'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserSocialConnection extends BaseModel {
    @column({ isPrimary: true })
    public userId: number

    @column()
    public provider: string

    @column()
    public connection: string

    @column()
    public isSocial: string

    @belongsTo(() => User)
    public user: BelongsTo<typeof User>

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
