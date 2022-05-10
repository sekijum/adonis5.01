import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Locale from 'App/Models/Locale'

export default class RequestUpdate {
    constructor(private ctx: HttpContextContract) {}

    public refs = schema.refs({ id: this.ctx.models['locale'].id })

    public schema = schema.create({
        name: schema.string({ trim: true }),
        originalName: schema.string({ trim: true }),
        code: schema.string({ trim: true }, [
            rules.unique({
                table: Locale.table,
                column: 'code',
                caseInsensitive: true,
                whereNot: { id: this.refs.id },
            }),
        ]),
    })

    public cacheKey = this.ctx.routeKey

    public messages = {}
}
