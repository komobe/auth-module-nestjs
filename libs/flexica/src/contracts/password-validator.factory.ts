import { BcryptPasswordValidator } from '@flexica/adapters';
import { PasswordValidator } from '@flexica/contracts';

export type PasswordType = 'BCRYPT';

export function createPasswordValidator(type: PasswordType): PasswordValidator {
    switch (type) {
        case 'BCRYPT':
            return new BcryptPasswordValidator();
        default:
            throw new Error('Unsupported password validator type');
    }
}
