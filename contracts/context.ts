import { Dictionary } from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

declare module '@ioc:Adonis/Core/HttpContext' {
    interface HttpContextContract {
        user: User
        validated: any
        models: Dictionary<any>
    }
}
