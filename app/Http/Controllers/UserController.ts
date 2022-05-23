import serviceUser from 'App/Services/ServiceUser'
import { SuccessResponse } from 'App/Shared/Response'
import Event from '@ioc:Adonis/Core/Event'

export default class UserController {
    public async list({ response, request }) {
        const data = await serviceUser.list(request.qs())
        return SuccessResponse({ response, data })
    }

    public async show({ response, models }) {
        return SuccessResponse({ response, data: models.user })
    }

    public async store({ response, validated }) {
        const data = await serviceUser.store(validated)
        Event.emit('user:store', data)
        return SuccessResponse({ response, data })
    }

    public async update({ response, validated, models }) {
        const data = await serviceUser.update(models.user, validated)
        Event.emit('user:update', data)
        return SuccessResponse({ response, data })
    }

    public async renewPassword({ response, validated, models }) {
        const data = await serviceUser.renewPassword(models.user, validated)
        Event.emit('user:update:password', data)
        return SuccessResponse({ response, data })
    }

    public async delete({ response, models }) {
        await serviceUser.delete(models.user)
        return SuccessResponse({ response, data: true })
    }
}
