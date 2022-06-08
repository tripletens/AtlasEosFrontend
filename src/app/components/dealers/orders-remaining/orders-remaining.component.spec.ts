import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersRemainingComponent } from './orders-remaining.component';

describe('OrdersRemainingComponent', () => {
  let component: OrdersRemainingComponent;
  let fixture: ComponentFixture<OrdersRemainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersRemainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersRemainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
