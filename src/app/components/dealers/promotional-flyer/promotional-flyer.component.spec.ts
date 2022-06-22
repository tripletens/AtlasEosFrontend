import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalFlyerComponent } from './promotional-flyer.component';

describe('PromotionalFlyerComponent', () => {
  let component: PromotionalFlyerComponent;
  let fixture: ComponentFixture<PromotionalFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionalFlyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
