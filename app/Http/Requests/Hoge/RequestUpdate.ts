import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class RequestUpdate {
    constructor(private ctx: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string({ trim: true }),
        locales: schema.array().members(
            schema.object.optional().members({
                name: schema.string({ trim: true }),
                type: schema.string({ trim: true }),
                code: schema.string({ trim: true }),
            })
        ),
    })

    public cacheKey = this.ctx.routeKey

    public messages = {}
}
