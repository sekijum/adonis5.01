import { SuccessResponse } from 'App/Shared/Response'
import serviceSession from 'App/Services/ServiceSession'
import serviceAuth0 from 'App/Services/ServiceAuth0'
import Event from '@ioc:Adonis/Core/Event'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionController {
    public async signin({ response, auth, validated }: HttpContextContract) {
        const token = await serviceSession.signin(auth, validated)
        Event.emit('user:signin', token.user)
        return SuccessResponse({ response, data: token })
    }

    public async signup({ response, auth, validated }) {
        const token = await serviceSession.signup(auth, validated)
        Event.emit('user:signup', token.user)
        return SuccessResponse({ response, data: token })
    }

    public async me({ response, auth }) {
        const user = await auth.authenticate()
        return SuccessResponse({ response, data: user })
    }

    public async refresh({ response, auth }) {
        const token = await serviceSession.refresh(auth)
        return SuccessResponse({ response, data: token })
    }

    public async signout({ response, auth }) {
        await auth.use('api').logout()
        return SuccessResponse({ response, data: true })
    }

    public async social({ response, auth, auth0, validated }: HttpContextContract) {
        const { accessToken } = validated
        const auth0user = await serviceAuth0.getUserByToken(auth0, accessToken)
        const token = await serviceSession.social(auth, auth0user)
        return SuccessResponse({ response, data: token })
    }
}
