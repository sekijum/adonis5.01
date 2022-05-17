import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SuccessResponse } from 'App/Shared/response'
import { ServiceSession } from 'App/Http/Services/ServiceSession'
import Event from '@ioc:Adonis/Core/Event'

export default class SessionController {
    public ServiceSession: ServiceSession

    constructor() {
        this.ServiceSession = new ServiceSession()
    }

    public async signin({ response, auth, validated }: HttpContextContract) {
        const token = await this.ServiceSession.signin(auth, validated)
        Event.emit('user:signin', token.user)
        return SuccessResponse({ response, data: token })
    }

    public async signup({ response, auth, validated }: HttpContextContract) {
        const token = await this.ServiceSession.signup(auth, validated)
        Event.emit('user:signup', token.user)
        return SuccessResponse({ response, data: token })
    }

    public async me({ response, auth }: HttpContextContract) {
        const user = await auth.authenticate()
        return SuccessResponse({ response, data: user })
    }

    public async refresh({ response, auth }: HttpContextContract) {
        const token = await this.ServiceSession.refresh(auth)
        return SuccessResponse({ response, data: token })
    }

    public async signout({ response, auth }: HttpContextContract) {
        await auth.use('api').logout()
        return SuccessResponse({ response, data: true })
    }
}
