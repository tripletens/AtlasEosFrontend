import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSeminiarsComponent } from './product-seminiars.component';

describe('ProductSeminiarsComponent', () => {
  let component: ProductSeminiarsComponent;
  let fixture: ComponentFixture<ProductSeminiarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSeminiarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSeminiarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
