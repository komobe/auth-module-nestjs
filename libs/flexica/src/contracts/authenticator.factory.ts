import { JwtAuthenticator } from '@adapters/jwt-authenticator.adapter';
import { Authenticator } from '@contracts/authenticator.interface';

export type AuthenticatorType = 'JWT' | 'BASIC';

export interface AuthenticatorParameters {
    jwtSecret?: string;
}


export function createAuthenticator(type: AuthenticatorType, parameters: AuthenticatorParameters = {}): Authenticator {
    switch (type) {
        case 'JWT':
            return new JwtAuthenticator(parameters.jwtSecret as string);
        default:
            throw new Error('Unsupported authenticator type');
    }
}