import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class RequestUpdate {
    constructor(private ctx: HttpContextContract) {}

    public schema = schema.create({
        firstName: schema.string({ trim: true }),
        lastName: schema.string({ trim: true }),
        type: schema.string({ trim: true }),
        email: schema.string({ trim: true }),
        password: schema.string({ trim: true }),
        rememberMeToken: schema.string.optional({ trim: true }),
    })

    public cacheKey = this.ctx.routeKey

    public messages = {}
}
