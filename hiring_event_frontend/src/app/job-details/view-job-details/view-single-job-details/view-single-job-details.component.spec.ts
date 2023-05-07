import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleJobDetailsComponent } from './view-single-job-details.component';

describe('ViewSingleJobDetailsComponent', () => {
  let component: ViewSingleJobDetailsComponent;
  let fixture: ComponentFixture<ViewSingleJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSingleJobDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
