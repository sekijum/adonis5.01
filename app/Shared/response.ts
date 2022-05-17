/* eslint-disable @typescript-eslint/naming-convention */
import { ResponseContract } from '@ioc:Adonis/Core/Response'

interface ISuccessRes {
    response: ResponseContract
    code?: number
    msg?: string
    data?: any
}
interface IErrorRes {
    response: ResponseContract
    code?: number
    msg: string
    data?: any
}

export const SuccessResponse = ({ response, code, data }: ISuccessRes) => {
    return response.status(code || 200).json(data)
}

export const ErrorResponse = ({ response, code, msg, data }: IErrorRes) => {
    return response.status(code || 500).json({ msg: msg.toString() ?? 'Error occured', data })
}
