import { column, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import HogeLocale from 'App/Models/HogeLocale'

export default class Hoge extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasMany(() => HogeLocale)
    public locales: HasMany<typeof HogeLocale>
}
