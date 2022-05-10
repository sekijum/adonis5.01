import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceUser } from 'App/Http/Services/ServiceUser'
import { SuccessResponse } from 'App/Shared/Services/ServiceResponse'
import Event from '@ioc:Adonis/Core/Event'

export default class UserController {
    public ServiceUser: ServiceUser

    constructor() {
        this.ServiceUser = new ServiceUser()
    }

    public async index({ response, request }: HttpContextContract) {
        const data = await this.ServiceUser.index(request.qs())
        return SuccessResponse({ response, data })
    }

    public async show({ models, response }: HttpContextContract) {
        return SuccessResponse({ response, data: models['user'] })
    }

    public async create({ response, validated }: HttpContextContract) {
        const data = await this.ServiceUser.create(validated)
        Event.emit('user:create', data)
        return SuccessResponse({ response, data })
    }

    public async update({ models, response, validated }: HttpContextContract) {
        const data = await this.ServiceUser.update(models['user'], validated)
        Event.emit('user:update', data)
        return SuccessResponse({ response, data })
    }

    public async renewPassword({ models, response, validated }: HttpContextContract) {
        const data = await this.ServiceUser.renewPassword(models['user'], validated)
        Event.emit('user:update:password', data)
        return SuccessResponse({ response, data })
    }

    public async delete({ models, response }: HttpContextContract) {
        await this.ServiceUser.delete(models['user'])
        return SuccessResponse({ response, data: true })
    }
}
