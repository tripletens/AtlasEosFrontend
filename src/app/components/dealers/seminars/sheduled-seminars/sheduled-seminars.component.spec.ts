import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheduledSeminarsComponent } from './sheduled-seminars.component';

describe('SheduledSeminarsComponent', () => {
  let component: SheduledSeminarsComponent;
  let fixture: ComponentFixture<SheduledSeminarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheduledSeminarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SheduledSeminarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
