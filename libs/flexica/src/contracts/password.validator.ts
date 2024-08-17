export interface PasswordValidator {
    /**
     * Validates a plain text password against a hashed password.
     * @param plainPassword - The plain text password to validate.
     * @param passwordHash - The hashed password to compare against.
     * @returns A promise that resolves to a boolean indicating whether the passwords match.
     */
    validate(plainPassword: string, passwordHash: string): Promise<boolean>;
}
