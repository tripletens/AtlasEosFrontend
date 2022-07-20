import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestShowOrderComponent } from './test-show-order.component';

describe('TestShowOrderComponent', () => {
  let component: TestShowOrderComponent;
  let fixture: ComponentFixture<TestShowOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestShowOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestShowOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
