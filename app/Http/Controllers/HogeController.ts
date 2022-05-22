import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import serviceHoge from 'App/Services/ServiceHoge'
import { SuccessResponse } from 'App/Shared/Response'

export default class HogeController {
    public async list({ response, request }: HttpContextContract) {
        const data = await serviceHoge.list(request.qs())
        return SuccessResponse({ response, data })
    }

    public async show({ response, models }: HttpContextContract) {
        return SuccessResponse({ response, data: models.hoge })
    }

    public async store({ response, validated }: HttpContextContract) {
        const data = await serviceHoge.store(validated)
        return SuccessResponse({ response, data })
    }

    public async update({ response, validated, models }: HttpContextContract) {
        const data = await serviceHoge.update(models.hoge, validated)
        return SuccessResponse({ response, data })
    }

    public async delete({ response, models }: HttpContextContract) {
        await serviceHoge.delete(models.hoge)
        return SuccessResponse({ response, data: true })
    }
}
