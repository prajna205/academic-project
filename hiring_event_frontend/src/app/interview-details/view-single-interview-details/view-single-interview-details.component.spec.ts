import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleInterviewDetailsComponent } from './view-single-interview-details.component';

describe('ViewSingleInterviewDetailsComponent', () => {
  let component: ViewSingleInterviewDetailsComponent;
  let fixture: ComponentFixture<ViewSingleInterviewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSingleInterviewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleInterviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
