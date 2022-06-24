import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesDealerComponent } from './purchases-dealer.component';

describe('PurchasesDealerComponent', () => {
  let component: PurchasesDealerComponent;
  let fixture: ComponentFixture<PurchasesDealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesDealerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
