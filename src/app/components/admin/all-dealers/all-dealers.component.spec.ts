import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDealersComponent } from './all-dealers.component';

describe('AllDealersComponent', () => {
  let component: AllDealersComponent;
  let fixture: ComponentFixture<AllDealersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDealersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDealersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
