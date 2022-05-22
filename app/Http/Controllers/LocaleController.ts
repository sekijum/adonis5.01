import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import serviceLocale from 'App/Services/ServiceLocale'
import { SuccessResponse } from 'App/Shared/Response'

export default class LocaleController {
    public async list({ response, request }: HttpContextContract) {
        const data = await serviceLocale.list(request.qs())
        return SuccessResponse({ response, data })
    }

    public async show({ models, response }: HttpContextContract) {
        const data = await serviceLocale.show(models['locale'])
        return SuccessResponse({ response, data })
    }

    public async store({ response, validated }: HttpContextContract) {
        const data = await serviceLocale.store(validated)
        return SuccessResponse({ response, data })
    }

    public async update({ models, response, validated }: HttpContextContract) {
        const data = await serviceLocale.update(models['locale'], validated)
        return SuccessResponse({ response, data })
    }

    public async delete({ models, response }: HttpContextContract) {
        await serviceLocale.delete(models['locale'])
        return SuccessResponse({ response, data: true })
    }
}
