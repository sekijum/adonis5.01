import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class Social {
    constructor(private ctx: HttpContextContract) {}

    public schema = schema.create({
        accessToken: schema.string(),
        expiresIn: schema.string(),
        scope: schema.string(),
        state: schema.string(),
        tokenType: schema.string(),
    })

    public cacheKey = this.ctx.routeKey

    public messages = {}
}
