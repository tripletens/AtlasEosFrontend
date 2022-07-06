import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPromotionalFlyerComponent } from './all-promotional-flyer.component';

describe('AllPromotionalFlyerComponent', () => {
  let component: AllPromotionalFlyerComponent;
  let fixture: ComponentFixture<AllPromotionalFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPromotionalFlyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPromotionalFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
