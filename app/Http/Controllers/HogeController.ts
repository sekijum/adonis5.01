import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ServiceHoge } from 'App/Http/Services/ServiceHoge'
import { SuccessResponse } from 'App/Shared/Services/ServiceResponse'

export default class HogeController {
    public ServiceHoge: ServiceHoge

    constructor() {
        this.ServiceHoge = new ServiceHoge()
    }

    public async index({ response, request }: HttpContextContract) {
        const data = await this.ServiceHoge.index(request.qs())
        return SuccessResponse({ response, data })
    }

    public async show({ models, response }: HttpContextContract) {
        const data = await this.ServiceHoge.show(models['hoge'])
        return SuccessResponse({ response, data })
    }

    public async create({ response, validated }: HttpContextContract) {
        const data = await this.ServiceHoge.create(validated)
        return SuccessResponse({ response, data })
    }

    public async update({ models, response, validated }: HttpContextContract) {
        const data = await this.ServiceHoge.update(models['hoge'], validated)
        return SuccessResponse({ response, data })
    }

    public async delete({ models, response }: HttpContextContract) {
        await this.ServiceHoge.delete(models['hoge'])
        return SuccessResponse({ response, data: true })
    }
}
