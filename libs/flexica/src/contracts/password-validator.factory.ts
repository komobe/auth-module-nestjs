import { BcryptPasswordValidator } from '@adapters/bcrypt-password-validator';
import { PasswordValidator } from '@contracts/password.validator';

export type PasswordType = 'BCRYPT';

export function createPasswordValidator(type: PasswordType): PasswordValidator {
    switch (type) {
        case 'BCRYPT':
            return new BcryptPasswordValidator();
        default:
            throw new Error('Unsupported password validator type');
    }
}