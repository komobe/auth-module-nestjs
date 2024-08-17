import { RetrieveUserProvider } from '../configs/types';
import { AuthenticatorParameters, AuthenticatorType } from './authenticator.factory';
import { PasswordType } from './password-validator.factory';


export interface FlexicaModuleOptions<T = any> {
    authenticatorType: AuthenticatorType;
    passwordType: PasswordType;
    parameters: AuthenticatorParameters;
    retrieveUserProvider: RetrieveUserProvider<T>;
}
