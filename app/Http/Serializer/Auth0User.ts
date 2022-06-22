import { IAuth0User } from 'App/Http/DTOs/IDtoUser'

export class Auth0User {
    constructor(private user: IAuth0User) {}

    public email(): string {
        return this.user.email ?? ''
    }

    public user_id(): string {
        return this.user.user_id ?? ''
    }

    public name(): string {
        return this.user.name ?? ''
    }

    public nickName(): string {
        return this.user.nickname ?? ''
    }

    public picture(): string {
        return this.user.picture ?? ''
    }

    public provider(): string {
        return this.user.user_id!.split('|')[1]
    }

    public identities(): any {
        return this.user.identities!.map(identity => {
            return {
                provider: identity.provider,
                user_id: identity.user_id,
                connection: identity.connection,
                isSocial: identity.isSocial,
            }
        })
    }
}
