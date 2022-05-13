import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { IDtoSignup, IDtoSignin } from 'App/Http/DTOs/IDtoSession'

// eslint-disable-next-line @typescript-eslint/naming-convention
export default interface ISessionRepository {
    signin(auth: AuthContract, data: IDtoSignin): Promise<any>
    signup(auth: AuthContract, dto: IDtoSignup): Promise<any>
    refresh(auth: AuthContract): Promise<any>
}
