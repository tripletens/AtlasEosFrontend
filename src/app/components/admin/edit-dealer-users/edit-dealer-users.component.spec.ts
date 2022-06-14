import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDealerUsersComponent } from './edit-dealer-users.component';

describe('EditDealerUsersComponent', () => {
  let component: EditDealerUsersComponent;
  let fixture: ComponentFixture<EditDealerUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDealerUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDealerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
