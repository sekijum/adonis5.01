import Route from '@ioc:Adonis/Core/Route'
import LocaleModel from 'App/Models/Locale'
import RequestStore from 'App/Http/Requests/locale/RequestStore'
import RequestUpdate from 'App/Http/Requests/locale/RequestUpdate'

export const Locale = () => {
    Route.group(() => {
        Route.get('/', 'LocaleController.index')
        Route.get('/:id', 'LocaleController.show').bindModel(LocaleModel, 'locale')
        Route.post('/', 'LocaleController.create').validate(RequestStore)
        Route.put('/:id', 'LocaleController.update')
            .bindModel(LocaleModel, 'locale')
            .validate(RequestUpdate)
        Route.delete('/:id', 'LocaleController.delete').bindModel(LocaleModel, 'locale')
    })
        .prefix('/locale')
        .namespace('App/Http/Controllers')
}
