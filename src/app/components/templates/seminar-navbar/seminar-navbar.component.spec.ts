import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeminarNavbarComponent } from './seminar-navbar.component';

describe('SeminarNavbarComponent', () => {
  let component: SeminarNavbarComponent;
  let fixture: ComponentFixture<SeminarNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeminarNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeminarNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
