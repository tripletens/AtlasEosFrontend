import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedSeminarsComponent } from './watched-seminars.component';

describe('WatchedSeminarsComponent', () => {
  let component: WatchedSeminarsComponent;
  let fixture: ComponentFixture<WatchedSeminarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchedSeminarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchedSeminarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
