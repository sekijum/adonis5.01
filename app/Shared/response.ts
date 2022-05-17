/* eslint-disable @typescript-eslint/naming-convention */
import { ResponseContract } from '@ioc:Adonis/Core/Response'

interface ISuccessResponse {
    response: ResponseContract
    data: any
}
interface IErrorResponse {
    response: ResponseContract
    code: number
    msg: string
}

export const SuccessResponse = ({ response, data }: ISuccessResponse) => {
    return response.status(200).json(data)
}

export const ErrorResponse = ({ response, code, msg }: IErrorResponse) => {
    return response.status(code).json({ msg: msg.toString() })
}
