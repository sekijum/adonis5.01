import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import serviceLocale from 'App/Services/ServiceLocale'
import { SuccessResponse } from 'App/Shared/Response'

export default class LocaleController {
    public async list({ response, request }: HttpContextContract) {
        const data = await serviceLocale.list(request.qs())
        return SuccessResponse({ response, data })
    }

    public async show({ response, models }: HttpContextContract) {
        return SuccessResponse({ response, data: models.locale })
    }

    public async store({ response, validated }: HttpContextContract) {
        const data = await serviceLocale.store(validated)
        return SuccessResponse({ response, data })
    }

    public async update({ response, validated, models }: HttpContextContract) {
        const data = await serviceLocale.update(models.locale, validated)
        return SuccessResponse({ response, data })
    }

    public async delete({ response, models }: HttpContextContract) {
        await serviceLocale.delete(models.locale)
        return SuccessResponse({ response, data: true })
    }
}
