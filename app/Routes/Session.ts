import Route from '@ioc:Adonis/Core/Route'
import RequestSignin from 'App/Http/Requests/Auth/RequestSignin'
import RequestSignup from 'App/Http/Requests/Auth/RequestSignup'
import RequestLinkage from 'App/Http/Requests/Auth/RequestLinkage'

export const Session = () => {
    Route.group(() => {
        Route.post('/signin', 'SessionController.signin').validate(RequestSignin)
        Route.post('/signup', 'SessionController.signup').validate(RequestSignup)
        Route.delete('/signout', 'SessionController.signout').middleware('auth:api')
        Route.get('/me', 'SessionController.me').middleware('auth:api')
        Route.put('/refresh', 'SessionController.refresh').middleware('auth:api')
        Route.post('/social', 'SessionController.social').validate(RequestLinkage)
    })
        .prefix('/sessions')
        .namespace('App/Http/Controllers')
}
