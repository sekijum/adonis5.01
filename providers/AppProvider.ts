import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { LucidModel } from '@ioc:Adonis/Lucid/Orm'
import NotFoundException from 'App/Exceptions/NotFoundException'
import { CamelCaseNamingStrategy } from '../strategies/CamelCaseNamingStrategy'

export default class AppProvider {
    constructor(protected app: ApplicationContract) {}

    public register() {
        // Register your own bindings
    }

    public async boot() {
        const { BaseModel } = await import('@ioc:Adonis/Lucid/Orm')
        BaseModel.namingStrategy = new CamelCaseNamingStrategy()

        // IoC container is ready
        const Route = this.app.container.use('Adonis/Core/Route')
        Route.Route.macro('bindModel', function <T extends LucidModel>(model: T, name: string, key: string = 'id') {
            this.middleware(async (ctx: HttpContextContract, next: () => void) => {
                if (!ctx.models) ctx.models = {}

                const val = ctx.request.param(key)
                const item = await model.findBy(key, val)

                if (!item) throw new NotFoundException(`${name} not found.`)

                ctx.models[name] = item
                next()
            })

            return this
        })

        Route.Route.macro('validate', function (validator: any) {
            this.middleware(async (ctx: HttpContextContract, next: () => void) => {
                ctx.validated = await ctx.request.validate(validator)
                next()
            })

            return this
        })
    }

    public async ready() {
        // App is ready
    }

    public async shutdown() {
        // Cleanup, since app is going down
    }
}
