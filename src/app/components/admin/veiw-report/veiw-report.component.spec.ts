import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwReportComponent } from './veiw-report.component';

describe('VeiwReportComponent', () => {
  let component: VeiwReportComponent;
  let fixture: ComponentFixture<VeiwReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiwReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiwReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
