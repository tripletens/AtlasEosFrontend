import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSeminarsComponent } from './all-seminars.component';

describe('AllSeminarsComponent', () => {
  let component: AllSeminarsComponent;
  let fixture: ComponentFixture<AllSeminarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSeminarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSeminarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
