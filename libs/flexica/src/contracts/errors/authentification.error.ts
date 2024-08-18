/**
 * Throws an AuthentificationError with the provided message, code, and context.
 * This function never returns and should be used to handle authentication-related errors.
 *
 * @param message - A descriptive message explaining the error.
 * @throws AuthentificationError - Always throws an instance of AuthentificationError.
 */
export function authentificationError(message: string): never {
    throw new AuthentificationError(message);
}


/**
 * Custom error class for handling authentication-related errors.
 */
export class AuthentificationError extends Error {
    constructor(message: string = 'Authentication failed') {
        super(message);
        this.name = 'AuthentificationError';
    }
}
