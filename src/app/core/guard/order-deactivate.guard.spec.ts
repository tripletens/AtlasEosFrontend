import { TestBed } from '@angular/core/testing';

import { OrderDeactivateGuard } from './order-deactivate.guard';

describe('OrderDeactivateGuard', () => {
  let guard: OrderDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrderDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
