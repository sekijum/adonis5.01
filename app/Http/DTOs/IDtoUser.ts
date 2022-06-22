import { User } from 'auth0'

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

export interface IAuth0User extends User {}
