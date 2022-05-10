import { TypedSchema, RequestValidatorNode, ParsedTypedSchema } from '@ioc:Adonis/Core/Validator'
import { LucidModel } from '@ioc:Adonis/Lucid/Orm'

declare module '@ioc:Adonis/Core/Route' {
    interface RouteContract {
        validate<T extends ParsedTypedSchema<TypedSchema>>(validator: RequestValidatorNode<T>): this
        bindModel<T extends LucidModel>(model: T, name: string, key?: string): this
    }
}
