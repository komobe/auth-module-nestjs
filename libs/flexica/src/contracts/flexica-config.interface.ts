import { RetrieveUserProvider } from 'libs/flexica/src/configs/types';

export interface FlexicaModuleOptions<T = any> {
    retrieveUserProvider: RetrieveUserProvider<T>;
}