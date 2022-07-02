import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCountdownComponent } from './set-countdown.component';

describe('SetCountdownComponent', () => {
  let component: SetCountdownComponent;
  let fixture: ComponentFixture<SetCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetCountdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
