import { TestBed } from '@angular/core/testing';

import { SalesRepGuard } from './sales-rep.guard';

describe('SalesRepGuard', () => {
  let guard: SalesRepGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SalesRepGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
