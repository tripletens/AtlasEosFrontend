import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDealerUsersComponent } from './all-dealer-users.component';

describe('AllDealerUsersComponent', () => {
  let component: AllDealerUsersComponent;
  let fixture: ComponentFixture<AllDealerUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDealerUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDealerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
