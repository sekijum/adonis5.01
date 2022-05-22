import Route from '@ioc:Adonis/Core/Route'
import LocaleModel from 'App/Models/Locale'
import RequestStore from 'App/Http/Requests/Locale/RequestStore'
import RequestUpdate from 'App/Http/Requests/Locale/RequestUpdate'

export const Locale = () => {
    Route.group(() => {
        Route.get('/', 'LocaleController.list')
        Route.get('/:id', 'LocaleController.show').bindModel(LocaleModel, 'locale')
        Route.post('/', 'LocaleController.store').validate(RequestStore)
        Route.put('/:id', 'LocaleController.update')
            .bindModel(LocaleModel, 'locale')
            .validate(RequestUpdate)
        Route.delete('/:id', 'LocaleController.delete').bindModel(LocaleModel, 'locale')
    })
        .prefix('/locale')
        .namespace('App/Http/Controllers')
}
