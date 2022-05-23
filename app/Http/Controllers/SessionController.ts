import { SuccessResponse } from 'App/Shared/Response'
import serviceSession from 'App/Services/ServiceSession'
import Event from '@ioc:Adonis/Core/Event'

export default class SessionController {
    public async signin({ response, auth, validated }) {
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
}
