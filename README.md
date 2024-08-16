
# Flexica

**Version:** 0.0.1  
**Author:** Moro KONÉ 
**License:** MIT  

Flexica is a flexible and adaptable authentication library for NestJS. It provides a set of tools and services to help you integrate authentication mechanisms into your NestJS applications.

## Features

- Supports various hashing algorithms via adapters
- Flexible service and module design
- Easy integration with other NestJS services
- Configurable and extensible

## Installation

To install Flexica, use npm or yarn:

```bash
npm install @komobe/flexica
# or
yarn add @komobe/flexica
```

## Usage

### Configuration

Flexica can be configured using the `FlexicaModuleOptions` interface. Here is an example configuration:

```typescript
import { FlexicaModuleOptions, AuthenticatorType, PasswordType } from '@komobe/flexica';

export const flexicaConfig: FlexicaModuleOptions = {
  authenticatorType: AuthenticatorType.JWT,  // Example authenticator type
  passwordType: PasswordType.BCRYPT,         // Example password hashing type
  parameters: {                              // Custom parameters
    jwtSecret: 'jwtsecrettoken',
    jwtExpirationTime: '3600s',
  },
  retrieveUserProvider: async (username: string) => {
    // Custom function to retrieve user data
    return await userService.findByUsername(username);
  },
};
```

### Importing the Flexica Module 

Use this configuration when importing the `FlexicaModule` in your `AppModule` or any other module:

```typescript
import { Module } from '@nestjs/common';
import { FlexicaModule } from '@komobe/flexica';
import { flexicaConfig } from './configs/flexica.config';

@Module({
  imports: [
    FlexicaModule.forRoot(flexicaConfig),
  ],
})
export class AppModule {}
```


## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue on the [GitHub Repository](https://github.com/komobe/auth-module-nestjs).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
