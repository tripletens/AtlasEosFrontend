import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPromotionalFlierComponent } from './edit-promotional-flier.component';

describe('EditPromotionalFlierComponent', () => {
  let component: EditPromotionalFlierComponent;
  let fixture: ComponentFixture<EditPromotionalFlierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPromotionalFlierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPromotionalFlierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
