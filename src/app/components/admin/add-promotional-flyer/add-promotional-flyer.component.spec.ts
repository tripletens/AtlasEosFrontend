import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromotionalFlyerComponent } from './add-promotional-flyer.component';

describe('AddPromotionalFlyerComponent', () => {
  let component: AddPromotionalFlyerComponent;
  let fixture: ComponentFixture<AddPromotionalFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPromotionalFlyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPromotionalFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
