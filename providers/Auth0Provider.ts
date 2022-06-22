import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { HttpContext } from '@adonisjs/core/build/standalone'
import { AuthenticationClient, ManagementClient } from 'auth0'
import Auth0Config from 'Config/auth0'

export default class Auth0Provider {
    constructor(protected app: ApplicationContract) {}

    public register() {
        // Register your own bindings
    }

    public async boot() {
        const authenticationClient = new AuthenticationClient({
            domain: Auth0Config.domain,
            clientId: Auth0Config.clientId,
            clientSecret: Auth0Config.clientSecret,
        })

        const managementClient = new ManagementClient({
            domain: Auth0Config.domain,
            audience: Auth0Config.audience,
            clientId: Auth0Config.clientId,
            clientSecret: Auth0Config.clientSecret,
        })

        HttpContext.macro('auth0', function () {
            return { authenticationClient, managementClient }
        })
    }

    public async ready() {
        // App is ready
    }

    public async shutdown() {
        // Cleanup, since app is going down
    }
}
