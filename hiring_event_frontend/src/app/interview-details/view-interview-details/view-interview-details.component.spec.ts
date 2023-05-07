import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInterviewDetailsComponent } from './view-interview-details.component';

describe('ViewInterviewDetailsComponent', () => {
  let component: ViewInterviewDetailsComponent;
  let fixture: ComponentFixture<ViewInterviewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInterviewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInterviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
