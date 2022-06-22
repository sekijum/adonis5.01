/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import { Hoge } from 'App/Routes/Hoge'
import { Locale } from 'App/Routes/Locale'
import { Session } from 'App/Routes/Session'
import { User } from 'App/Routes/User'
import { Auth0 } from 'App/Routes/Auth0'

Route.group(() => {
    Hoge()
    Locale()
    Session()
    User()
    Auth0()
}).prefix('/api')

Route.get('/', async () => {
    return { hello: 'world' }
})

Route.get('/docs', async ({ view }: HttpContextContract) => {
    const specUrl = '/docs/swagger.json'
    return view.render('swagger', { specUrl })
})
