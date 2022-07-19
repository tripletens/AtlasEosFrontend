import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasNotesComponent } from './atlas-notes.component';

describe('AtlasNotesComponent', () => {
  let component: AtlasNotesComponent;
  let fixture: ComponentFixture<AtlasNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
