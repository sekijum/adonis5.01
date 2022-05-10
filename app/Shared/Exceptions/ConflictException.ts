import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ErrorResponse } from 'App/Shared/Services/ServiceResponse'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UnAuthorizedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ConflictException extends Exception {
    constructor(message: string, status_code = 409) {
        super(message, status_code)
    }

    public async handle(error: this, ctx: HttpContextContract) {
        ErrorResponse({
            response: ctx.response,
            code: error.status,
            msg: error.message || 'You can not save same data.',
        })
    }
}
