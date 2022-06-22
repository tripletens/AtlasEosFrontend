import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingSeminarsComponent } from './ongoing-seminars.component';

describe('OngoingSeminarsComponent', () => {
  let component: OngoingSeminarsComponent;
  let fixture: ComponentFixture<OngoingSeminarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngoingSeminarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingSeminarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
