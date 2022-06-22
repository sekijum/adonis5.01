import ServiceAuth0 from 'App/Services/ServiceAuth0'
import { SuccessResponse } from 'App/Shared/Response'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HogeController {
    public async connections({ response, auth0 }: HttpContextContract) {
        const data = await ServiceAuth0.connections(auth0)
        return SuccessResponse({ response, data })
    }

    public async signin({ response, auth, auth0, validated }: HttpContextContract) {
        const auth0user = await ServiceAuth0.getAuth0UserByToken(auth0, validated.accessToken)
        const token = await ServiceAuth0.signin(auth, auth0user)
        return SuccessResponse({ response, data: token })
    }

    public async signup({ response, auth, auth0, validated }: HttpContextContract) {
        const auth0user = await ServiceAuth0.getAuth0UserByToken(auth0, validated.accessToken)
        const token = await ServiceAuth0.signup(auth, auth0user)
        return SuccessResponse({ response, data: token })
    }
}
