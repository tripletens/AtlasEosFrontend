import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderVendorPageComponent } from './edit-order-vendor-page.component';

describe('EditOrderVendorPageComponent', () => {
  let component: EditOrderVendorPageComponent;
  let fixture: ComponentFixture<EditOrderVendorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrderVendorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrderVendorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
