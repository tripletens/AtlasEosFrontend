import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchNavbarComponent } from './branch-navbar.component';

describe('BranchNavbarComponent', () => {
  let component: BranchNavbarComponent;
  let fixture: ComponentFixture<BranchNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
