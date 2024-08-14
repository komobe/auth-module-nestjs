import * as bcrypt from 'bcrypt';
import {PasswordValidator} from "@komobe/flexica/contracts/password-validator";
import {BcryptPasswordValidator} from "@komobe/flexica/adapters/bcrypt-password-validator";

describe('validatePassword', () => {
    const plainPassword = 'mySecurePassword';
    let passwordValidator: PasswordValidator;
    let hashedPassword: string;

    beforeAll(async () => {
        passwordValidator = new BcryptPasswordValidator();
        hashedPassword = await bcrypt.hash(plainPassword, 10);
    });

    it('should return true for a correct password', async () => {
        const isValid = await passwordValidator.validate(plainPassword, hashedPassword);
        expect(isValid).toBe(true);
    });

    it('should return false for an incorrect password', async () => {
        const isValid = await passwordValidator.validate('wrongPassword', hashedPassword);
        expect(isValid).toBe(false);
    });

    it('should return false for an empty password', async () => {
        const isValid = await passwordValidator.validate('', hashedPassword);
        expect(isValid).toBe(false);
    });

    it('should return false if the hash is invalid', async () => {
        const isValid = await passwordValidator.validate(plainPassword, 'invalid-hash');
        expect(isValid).toBe(false);
    });
});