import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeminarComponent } from './edit-seminar.component';

describe('EditSeminarComponent', () => {
  let component: EditSeminarComponent;
  let fixture: ComponentFixture<EditSeminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSeminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSeminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
