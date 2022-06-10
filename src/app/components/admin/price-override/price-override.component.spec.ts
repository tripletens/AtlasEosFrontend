import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceOverrideComponent } from './price-override.component';

describe('PriceOverrideComponent', () => {
  let component: PriceOverrideComponent;
  let fixture: ComponentFixture<PriceOverrideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceOverrideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceOverrideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
