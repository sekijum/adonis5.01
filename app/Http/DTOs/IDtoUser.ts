/* eslint-disable @typescript-eslint/naming-convention */
export interface IDtoUser {
    firstName: string
    lastName: string
    type: string
    email: string
    password: string
    rememberMeToken?: string
}

export interface IDtorenewPassword {
    password: string
    oldPassword: string
}
