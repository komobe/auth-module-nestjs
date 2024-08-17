/**
 * Custom error class for handling authentication-related errors.
 */
export class AuthentificationError extends Error {
    constructor(message: string = 'Authentication failed') {
        super(message);
        this.name = 'AuthentificationError';
    }
}
