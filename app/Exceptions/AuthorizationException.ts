import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ErrorResponse } from 'App/Shared/response'

export default class AuthorizationException extends Exception {
    constructor(message: string = '', status_code = 401) {
        super(message, status_code)
    }

    public async handle(error: this, ctx: HttpContextContract) {
        ErrorResponse({
            response: ctx.response,
            code: error.status,
            msg: error.message || 'You are not authorized',
        })
    }
}
