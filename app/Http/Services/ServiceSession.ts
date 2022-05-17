import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import AuthorizationException from 'App/Exceptions/AuthorizationException'
import User from 'App/Models/User'
import { IDtoSignup, IDtoSignin } from 'App/Http/DTOs/IDtoSession'
import ISessionRepository from 'App/Http/Interface/ISessionRepository'

export class ServiceSession implements ISessionRepository {
    public async signin(auth: AuthContract, data: IDtoSignin): Promise<any> {
        const { email, password } = data

        const account = User.query().where('email', email).first()
        if (!account) new AuthorizationException('User not found.')

        const token = await auth.attempt(email, password)
        if (!token) new AuthorizationException('Password is incorrect.')

        return token
    }

    public async signup(auth: AuthContract, data: IDtoSignup): Promise<any> {
        try {
            const user = await User.create(data)
            return auth.login(user)
        } catch (e) {
            throw new AuthorizationException('signup faild.')
        }
    }

    public async refresh(auth: AuthContract): Promise<any> {
        const user = await auth.authenticate()
        if (!user) new AuthorizationException('User not found.')

        const token = await auth.login(user)
        if (token) await auth.use('api').revoke()

        return token
    }
}
