import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInterviewDetailsComponent } from './edit-interview-details.component';

describe('EditInterviewDetailsComponent', () => {
  let component: EditInterviewDetailsComponent;
  let fixture: ComponentFixture<EditInterviewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInterviewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInterviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
