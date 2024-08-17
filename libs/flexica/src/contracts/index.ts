export { FlexicaModuleOptions } from './flexica-config.interface';
export { AuthentificationError } from './errors/authentification.error';
export { AuthPayload } from './auth-payload.interface';
export { Authenticator } from './authenticator.interface';
export {
    AuthenticatorParameters,
    AuthenticatorType,
    createAuthenticator,
} from './authenticator.factory';
export { PasswordType, createPasswordValidator } from './password-validator.factory';
export { PasswordValidator } from './password.validator';
