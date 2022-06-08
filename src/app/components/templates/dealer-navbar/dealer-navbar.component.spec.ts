import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerNavbarComponent } from './dealer-navbar.component';

describe('DealerNavbarComponent', () => {
  let component: DealerNavbarComponent;
  let fixture: ComponentFixture<DealerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
