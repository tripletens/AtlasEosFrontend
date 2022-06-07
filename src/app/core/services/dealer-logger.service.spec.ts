import { TestBed } from '@angular/core/testing';

import { DealerLoggerService } from './dealer-logger.service';

describe('DealerLoggerService', () => {
  let service: DealerLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealerLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
