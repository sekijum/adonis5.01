import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class RequestUpdatePassword {
    constructor(private ctx: HttpContextContract) {}

    public schema = schema.create({
        password: schema.string({ trim: true }),
        oldPassword: schema.string({ trim: true }),
    })

    public cacheKey = this.ctx.routeKey

    public messages = {}
}
