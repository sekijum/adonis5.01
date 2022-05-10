import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Hoge from 'App/Models/Hoge'

export default class HogeLocale extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public hogeId: number

    @column()
    public name: string

    @column()
    public type: string

    @column()
    public code: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => Hoge)
    public hoge: BelongsTo<typeof Hoge>
}
