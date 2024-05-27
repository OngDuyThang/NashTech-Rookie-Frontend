export type TTokenResponse = {
    [AUTH.ACCESS_TOKEN]: string,
    username: string,
    email: string,
    picture: string,
}

export enum AUTH {
    ACCESS_TOKEN = 'access_token'
}