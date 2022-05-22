import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import serviceHoge from 'App/Services/ServiceHoge'
import { SuccessResponse } from 'App/Shared/Response'

export default class HogeController {
    public async list({ response, request }: HttpContextContract) {
        const data = await serviceHoge.list(request.qs())
        return SuccessResponse({ response, data })
    }

    public async show({ models, response }: HttpContextContract) {
        const data = models['hoge']
        return SuccessResponse({ response, data })
    }

    public async store({ response, validated }: HttpContextContract) {
        const data = await serviceHoge.store(validated)
        return SuccessResponse({ response, data })
    }

    public async update({ models, response, validated }: HttpContextContract) {
        const data = await serviceHoge.update(models['hoge'], validated)
        return SuccessResponse({ response, data })
    }

    public async delete({ models, response }: HttpContextContract) {
        await serviceHoge.delete(models['hoge'])
        return SuccessResponse({ response, data: true })
    }
}
