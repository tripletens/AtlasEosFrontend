import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportTicketComponent } from './view-report-ticket.component';

describe('ViewReportTicketComponent', () => {
  let component: ViewReportTicketComponent;
  let fixture: ComponentFixture<ViewReportTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReportTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReportTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
