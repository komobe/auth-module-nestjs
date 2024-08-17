import { JwtAuthenticator } from '@flexica/adapters';
import { Authenticator } from '@flexica/contracts';

export type AuthenticatorType = 'JWT' | 'BASIC';

export interface AuthenticatorParameters {
    jwtSecret?: string;
}

export function createAuthenticator(
    type: AuthenticatorType,
    parameters: AuthenticatorParameters = {},
): Authenticator {
    switch (type) {
        case 'JWT':
            return new JwtAuthenticator(parameters.jwtSecret as string);
        default:
            throw new Error('Unsupported authenticator type');
    }
}
