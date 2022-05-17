import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ErrorResponse } from 'App/Shared/response'
import Logger from '@ioc:Adonis/Core/Logger'

export default class AppException extends Exception {
    public err: any

    constructor(message: string, err: any = null, status_code = 400) {
        super(message, status_code)
        this.err = err
    }

    public async handle(error: this, ctx: HttpContextContract) {
        Logger.error({ err: error.err }, error.message)
        ErrorResponse({ response: ctx.response, code: error.status, msg: error.message })
    }
}
