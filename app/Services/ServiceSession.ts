import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import AuthorizationException from 'App/Exceptions/AuthorizationException'
import User from 'App/Models/User'
import { IDtoSignup, IDtoSignin } from 'App/Http/DTOs/IDtoSession'
import ISessionRepository from 'App/Http/Interface/ISessionRepository'
import { Auth0User } from 'App/Http/Serializer/Auth0User'
import SocialConnection from 'App/Models/SocialConnection'

export class ServiceSession implements ISessionRepository {
    public async signin(auth: AuthContract, data: IDtoSignin): Promise<any> {
        try {
            const account = await User.query().where('email', data.email).first()
            if (account) {
                const token = await auth.attempt(data.email, data.password)
                if (!token) {
                    throw new AuthorizationException('Password is incorrect.')
                }
                return token
            } else {
                throw new AuthorizationException('User not found.')
            }
        } catch (e) {
            throw new AuthorizationException('signin faild.')
        }
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
        if (!user) throw new AuthorizationException('User not found.')

        const token = await auth.login(user)
        if (token) await auth.use('api').revoke()

        return token
    }

    public async social(auth: AuthContract, auth0user: Auth0User): Promise<any> {
        try {
            if (auth0user && auth0user.user_id()) {
                const user = await User.query()
                    .whereNotNull('auth0id')
                    .where('auth0id', auth0user.user_id())
                    .first()
                if (user && user.related('socialConnections')) return auth.login(user)
            }

            const connection = await SocialConnection.find(({ id }) => id === auth0user.user_id())
            if (connection) return auth.loginViaId(connection.userId)

            const newUser = await User.create({
                email: auth0user.email(),
                nickName: auth0user.nickName(),
                picture: auth0user.picture(),
                auth0Id: auth0user.user_id(),
            })
            newUser
                .related('socialConnections')
                .updateOrCreateMany(auth0user.identities(), 'userId')
            return auth.login(newUser)
        } catch (e) {
            throw new AuthorizationException('User authentication faild.')
        }
    }
}

const serviceSession = new ServiceSession()
export default serviceSession
