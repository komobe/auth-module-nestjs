import { Test, TestingModule } from '@nestjs/testing';
import { FlexicaService } from './flexica.service';

describe('FlexicaService', () => {
  let service: FlexicaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlexicaService],
    }).compile();

    service = module.get<FlexicaService>(FlexicaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
