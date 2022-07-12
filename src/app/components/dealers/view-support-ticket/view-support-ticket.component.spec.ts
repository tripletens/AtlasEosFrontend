import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSupportTicketComponent } from './view-support-ticket.component';

describe('ViewSupportTicketComponent', () => {
  let component: ViewSupportTicketComponent;
  let fixture: ComponentFixture<ViewSupportTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSupportTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSupportTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
