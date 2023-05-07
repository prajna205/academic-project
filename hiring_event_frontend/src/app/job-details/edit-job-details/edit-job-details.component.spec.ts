import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobDetailsComponent } from './edit-job-details.component';

describe('EditJobDetailsComponent', () => {
  let component: EditJobDetailsComponent;
  let fixture: ComponentFixture<EditJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJobDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
