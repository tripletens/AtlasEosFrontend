import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestQuickOrderComponent } from './test-quick-order.component';

describe('TestQuickOrderComponent', () => {
  let component: TestQuickOrderComponent;
  let fixture: ComponentFixture<TestQuickOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestQuickOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestQuickOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
