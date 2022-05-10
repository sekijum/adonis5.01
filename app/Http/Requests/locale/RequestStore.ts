import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Locale from 'App/Models/Locale'

export default class RequestStore {
    constructor(private ctx: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string({ trim: true }),
        originalName: schema.string({ trim: true }),
        code: schema.string({ trim: true }, [
            rules.unique({
                table: Locale.table,
                column: 'code',
                caseInsensitive: true,
            }),
        ]),
    })

    public cacheKey = this.ctx.routeKey

    public messages = {}
}
