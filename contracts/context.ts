import { Dictionary } from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { AuthenticationClient, ManagementClient } from 'auth0'

declare module '@ioc:Adonis/Core/HttpContext' {
    interface HttpContextContract {
        user: User
        validated: any
        models: Dictionary<any>
        auth0: () => {
            authenticationClient: AuthenticationClient
            managementClient: ManagementClient
        }
    }
}
