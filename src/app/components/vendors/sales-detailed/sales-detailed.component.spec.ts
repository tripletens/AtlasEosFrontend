import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDetailedComponent } from './sales-detailed.component';

describe('SalesDetailedComponent', () => {
  let component: SalesDetailedComponent;
  let fixture: ComponentFixture<SalesDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
