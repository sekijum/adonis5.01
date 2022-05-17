/* eslint-disable @typescript-eslint/naming-convention */
import { ResponseContract } from '@ioc:Adonis/Core/Response'

interface ISuccessResponse {
    response: ResponseContract
    code?: number
    msg?: string
    data?: any
}
interface IErrorResponse {
    response: ResponseContract
    code?: number
    msg: string
    data?: any
}

export const SuccessResponse = ({ response, code, data }: ISuccessResponse) => {
    return response.status(code || 200).json(data)
}

export const ErrorResponse = ({ response, code, msg, data }: IErrorResponse) => {
    return response.status(code || 500).json({ msg: msg.toString() ?? 'Error occured', data })
}
