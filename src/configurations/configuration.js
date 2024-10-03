
export const OAuthGGConfig = {
    clientId: process.env.REACT_APP_CLIENT_ID_GOOGLE,
    redirectUri: process.env.REACT_APP_REDIRECT_URI_OAUTH2,
    authUri: "https://accounts.google.com/o/oauth2/auth",
};
export const OAuthGHConfig = {
    clientId: process.env.REACT_APP_CLIENT_ID_GITHUB,
    redirectUri: process.env.REACT_APP_REDIRECT_URI_OAUTH2,
    authUri: "https://github.com/login/oauth/authorize",
};
export const OAuthFBConfig = {
    clientId: process.env.REACT_APP_CLIENT_ID_FACEBOOK,
    redirectUri: process.env.REACT_APP_REDIRECT_URI_OAUTH2,
    authUri: "https://www.facebook.com/v20.0/dialog/oauth",
};
export const TinyMCEConfig = {
    apiKey: process.env.REACT_APP_API_TINY_MCE
}