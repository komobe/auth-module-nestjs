import { authentificationError, FlexicaService } from '../src';
import { RetrieveUserProvider } from '../src/configs';
import {
    Authenticator,
    AuthentificationError,
    AuthPayload,
    PasswordValidator,
} from '../src/contracts';


describe('FlexicaService', () => {
    let flexicaService: FlexicaService;
    let mockAuthenticator: Authenticator;
    let mockPasswordValidator: PasswordValidator;
    let mockRetrieveUserProvider: RetrieveUserProvider<any>;

    beforeEach(() => {
        mockAuthenticator = { authenticate: jest.fn() };
        mockPasswordValidator = { validate: jest.fn() };
        mockRetrieveUserProvider = jest.fn();

        flexicaService = new FlexicaService(mockAuthenticator, mockPasswordValidator, mockRetrieveUserProvider);
    });

    it('should successfully verify a user with a valid Bearer token', async () => {
        const header = 'Bearer valid-token';
        const decodedPayload: AuthPayload = { username: 'testuser', password: 'testpass' };
        const user = { username: 'testuser', password: 'hashedpassword' };

        (mockAuthenticator.authenticate as jest.Mock).mockResolvedValue(decodedPayload);
        (mockRetrieveUserProvider as jest.Mock).mockResolvedValue(user);

        const result = await flexicaService.verifyUser(header);

        expect(result).toEqual(user);
        expect(mockAuthenticator.authenticate).toHaveBeenCalledWith('valid-token');
        expect(mockRetrieveUserProvider).toHaveBeenCalledWith(decodedPayload);
    });

    it('should throw an error for unsupported authentication scheme', async () => {
        const header = 'Basic invalid-token';

        await expect(flexicaService.verifyUser(header)).rejects.toThrow(AuthentificationError);
    });

    it('should throw an error for invalid token', async () => {
        const header = 'Bearer invalid-token';

        (mockAuthenticator.authenticate as jest.Mock).mockRejectedValue(() => authentificationError('Invalid token'));

        await expect(flexicaService.verifyUser(header)).rejects.toThrow(AuthentificationError);
    });

    it('should throw an error if the user is not found', async () => {
        const header = 'Bearer valid-token';
        const decodedPayload: AuthPayload = { username: 'testuser', password: 'testpass' };

        (mockAuthenticator.authenticate as jest.Mock).mockResolvedValue(decodedPayload);
        (mockRetrieveUserProvider as jest.Mock).mockResolvedValue(null);

        await expect(flexicaService.verifyUser(header)).rejects.toThrow(AuthentificationError);
    });
});