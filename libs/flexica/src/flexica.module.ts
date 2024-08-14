import { Module } from '@nestjs/common';
import { FlexicaService } from './flexica.service';

@Module({
    providers: [FlexicaService],
    exports: [FlexicaService],
})
export class FlexicaModule {}
