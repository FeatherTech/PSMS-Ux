import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionViewComponent } from './admission-view.component';

describe('AdmissionViewComponent', () => {
  let component: AdmissionViewComponent;
  let fixture: ComponentFixture<AdmissionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
