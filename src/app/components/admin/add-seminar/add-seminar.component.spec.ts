import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeminarComponent } from './add-seminar.component';

describe('AddSeminarComponent', () => {
  let component: AddSeminarComponent;
  let fixture: ComponentFixture<AddSeminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSeminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSeminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
