import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVendorUserComponent } from './edit-vendor-user.component';

describe('EditVendorUserComponent', () => {
  let component: EditVendorUserComponent;
  let fixture: ComponentFixture<EditVendorUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVendorUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVendorUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
