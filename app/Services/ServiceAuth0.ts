import AppException from 'App/Exceptions/AppException'
import User from 'App/Models/User'
import { Auth0User } from 'App/Http/Serializer/Auth0User'
import { AuthenticationClient, ManagementClient } from 'auth0'
import Auth0Config from 'Config/auth0'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import AuthorizationException from 'App/Exceptions/AuthorizationException'

type Auth0 = {
    authenticationClient: AuthenticationClient
    managementClient: ManagementClient
}
export class ServiceAuth0 {
    public async connections(auth0: () => Auth0): Promise<any> {
        try {
            const connections = await auth0().managementClient.getConnections()
            const data = connections
                .map(connection => {
                    return {
                        scope: connection.options.scope ?? [],
                        strategy: connection.strategy,
                        name: connection.name,
                        url: Auth0Config.getUrl(connection.strategy!),
                    }
                })
                .filter(({ name }) => name !== 'Username-Password-Authentication')
            return data
        } catch (e) {
            throw new AppException(e.message)
        }
    }

    public async signin(auth: AuthContract, auth0user: Auth0User): Promise<any> {
        try {
            if (auth0user && auth0user.user_id()) {
                const user = await User.query()
                    .whereNotNull('auth0id')
                    .where('auth0id', auth0user.user_id())
                    .firstOrFail()
                if (user && user.related('socialConnections')) return auth.login(user)
            }
            throw new AuthorizationException('Not Already Registered.')
        } catch (e) {
            throw new AuthorizationException('User Authentication Faild.')
        }
    }

    public async signup(auth: AuthContract, auth0user: Auth0User): Promise<any> {
        try {
            const user = await User.query()
                .whereNotNull('auth0id')
                .where('auth0id', auth0user.user_id())
                .firstOrFail()
            if (user && user.related('socialConnections')) {
                throw new AuthorizationException('Already Registered.')
            } else {
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
            }
        } catch (e) {
            throw new AuthorizationException('User Authentication Faild.')
        }
    }

    public async getAuth0UserByToken(auth0: () => Auth0, accessToken: string): Promise<Auth0User> {
        const { authenticationClient, managementClient } = auth0()
        try {
            const { sub } = await authenticationClient.getProfile(accessToken)
            const user = await managementClient.getUser({ id: sub })
            return new Auth0User(user)
        } catch (e) {
            throw new AppException('Auth0 User Not Found.')
        }
    }
}

const serviceAuth0 = new ServiceAuth0()
export default serviceAuth0
