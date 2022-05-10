import Route from '@ioc:Adonis/Core/Route'
import UserModel from 'App/Models/User'
import RequestStore from 'App/Http/Requests/User/RequestStore'
import RequestUpdate from 'App/Http/Requests/User/RequestUpdate'
import RequestUpdatePassword from 'App/Http/Requests/User/RequestUpdatePassword'

export const User = () => {
    Route.group(() => {
        Route.get('/', 'UserController.index')
        Route.get('/:id', 'UserController.show').bindModel(UserModel, 'user')
        Route.post('/', 'UserController.create').validate(RequestStore)
        Route.put('/:id', 'UserController.update')
            .bindModel(UserModel, 'user')
            .validate(RequestUpdate)
        Route.patch('/:id/password', 'UserController.renewPassword')
            .bindModel(UserModel, 'user')
            .validate(RequestUpdatePassword)
        Route.delete('/:id', 'UserController.delete').bindModel(UserModel, 'user')
    })
        .prefix('/user')
        .namespace('App/Http/Controllers')
}
