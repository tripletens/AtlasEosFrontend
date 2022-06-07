import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDealersComponent } from './add-dealers.component';

describe('AddDealersComponent', () => {
  let component: AddDealersComponent;
  let fixture: ComponentFixture<AddDealersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDealersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDealersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
