import Env from '@ioc:Adonis/Core/Env'

const Auth0Config = {
    domain: Env.get('AUTH0_DOMAIN'),
    callbackUrl: Env.get('AUTH0_CALLBACK_URL'),
    clientId: Env.get('AUTH0_CLIENT_ID'),
    clientSecret: Env.get('AUTH0_CLIENT_SECRET'),
    audience: Env.get('AUTH0_AUDIENCE'),
    getUrl: (connection: string) => {
        const clientId = Auth0Config.clientId
        const domain = Auth0Config.domain
        const redirectUri = Auth0Config.callbackUrl
        return `https://${domain}/authorize?response_type=token&client_id=${clientId}&connection=${connection}&scope=openid email&redirect_uri=${redirectUri}`
    },
}

export default Auth0Config
