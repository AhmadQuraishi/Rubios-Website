

export interface OAuthResponse {
    code: string;
    jwt: string;
    client: string;
    authorizationcode?: string,
    authtoken?: string,
    basketid?: string,
    contactnumber?: string,
    emailaddress?: string,
    expiresin?: string,
    firstname?: string,
    lastname?: string,
    provider?: string,
    providertoken?: string,
    provideruserid?: string,
    refreshtoken?: null,
  }