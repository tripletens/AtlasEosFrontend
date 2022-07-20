import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceOverrideReportComponent } from './price-override-report.component';

describe('PriceOverrideReportComponent', () => {
  let component: PriceOverrideReportComponent;
  let fixture: ComponentFixture<PriceOverrideReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceOverrideReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceOverrideReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
