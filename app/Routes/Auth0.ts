import Route from '@ioc:Adonis/Core/Route'
import RequestLinkage from 'App/Http/Requests/Auth/RequestLinkage'

export const Auth0 = () => {
    Route.group(() => {
        Route.get('/connections', 'Auth0Controller.connections')
        Route.post('/link', 'Auth0Controller.link').middleware('auth:api').validate(RequestLinkage)
        Route.get('/unlink/:connectionId', 'Auth0Controller.unlink').middleware('auth:api')
        Route.post('/signin', 'Auth0Controller.signin').validate(RequestLinkage)
        Route.post('/signup', 'Auth0Controller.signup').validate(RequestLinkage)
    })
        .prefix('/auth0')
        .namespace('App/Http/Controllers')
}
