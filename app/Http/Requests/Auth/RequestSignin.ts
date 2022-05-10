import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class SigninValidate {
    constructor(private ctx: HttpContextContract) {}

    public schema = schema.create({
        email: schema.string({ trim: true }),
        password: schema.string({ trim: true }),
    })

    public cacheKey = this.ctx.routeKey

    public messages = {}
}
