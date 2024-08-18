import { FlexicaModuleOptions } from '../contracts';
import { initializeOptions } from '../helpers/flexica-options.utils';

export class FlexicaOptionsInitializer {
    static initialize<T>(options: FlexicaModuleOptions<T>): FlexicaModuleOptions<T> {
        return initializeOptions(options);
    }
}