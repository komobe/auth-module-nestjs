import { FlexicaModuleOptions } from '../contracts';
import { FlexicaService } from '../flexica.service';
import { createProvidersFromOptions } from '../helpers/flexica-options.utils';

export class FlexicaProvidersInitializer {
    static create<T>(options: FlexicaModuleOptions<T>) {
        return [FlexicaService, ...createProvidersFromOptions(options)];
    }
}