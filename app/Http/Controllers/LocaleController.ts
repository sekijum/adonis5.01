import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceLocale } from 'App/Http/Services/ServiceLocale'
import { SuccessResponse } from 'App/Shared/Services/ServiceResponse'

export default class LocaleController {
    public ServiceLocale: ServiceLocale

    constructor() {
        this.ServiceLocale = new ServiceLocale()
    }

    public async index({ response, request }: HttpContextContract) {
        const data = await this.ServiceLocale.index(request.qs())
        return SuccessResponse({ response, data })
    }

    public async show({ models, response }: HttpContextContract) {
        const data = models['locale']
        return SuccessResponse({ response, data })
    }

    public async create({ response, validated }: HttpContextContract) {
        const data = await this.ServiceLocale.create(validated)
        return SuccessResponse({ response, data })
    }

    public async update({ models, response, validated }: HttpContextContract) {
        const data = await this.ServiceLocale.update(models['locale'], validated)
        return SuccessResponse({ response, data })
    }

    public async delete({ models, response }: HttpContextContract) {
        await this.ServiceLocale.delete(models['locale'])
        return SuccessResponse({ response, data: true })
    }
}
