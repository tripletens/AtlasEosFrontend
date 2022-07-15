import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReportTicketsComponent } from './all-report-tickets.component';

describe('AllReportTicketsComponent', () => {
  let component: AllReportTicketsComponent;
  let fixture: ComponentFixture<AllReportTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllReportTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllReportTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
