import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveProblemComponent } from './resolve-problem.component';

describe('ResolveProblemComponent', () => {
  let component: ResolveProblemComponent;
  let fixture: ComponentFixture<ResolveProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolveProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
