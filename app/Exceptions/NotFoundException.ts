import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ErrorResponse } from 'App/Shared/response'

export default class NotFoundException extends Exception {
    constructor(message: string) {
        super(message, 404)
    }

    public async handle(error: this, ctx: HttpContextContract) {
        ErrorResponse({
            response: ctx.response,
            code: error.status,
            msg: error.message || 'data not found.',
        })
    }
}
