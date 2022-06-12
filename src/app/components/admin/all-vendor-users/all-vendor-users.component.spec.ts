import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVendorUsersComponent } from './all-vendor-users.component';

describe('AllVendorUsersComponent', () => {
  let component: AllVendorUsersComponent;
  let fixture: ComponentFixture<AllVendorUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllVendorUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVendorUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
