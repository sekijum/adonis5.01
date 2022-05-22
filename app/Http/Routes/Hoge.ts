import Route from '@ioc:Adonis/Core/Route'
import HogeModel from 'App/Models/Hoge'
import RequestStore from 'App/Http/Requests/Hoge/RequestStore'
import RequestUpdate from 'App/Http/Requests/Hoge/RequestUpdate'

export const Hoge = () => {
    Route.group(() => {
        Route.get('/', 'HogeController.list')
        Route.get('/:id', 'HogeController.show').bindModel(HogeModel, 'hoge')
        Route.post('/', 'HogeController.store').validate(RequestStore)
        Route.put('/:id', 'HogeController.update')
            .bindModel(HogeModel, 'hoge')
            .validate(RequestUpdate)
        Route.delete('/:id', 'HogeController.delete').bindModel(HogeModel, 'hoge')
    })
        .prefix('/hoge')
        .namespace('App/Http/Controllers')
}
