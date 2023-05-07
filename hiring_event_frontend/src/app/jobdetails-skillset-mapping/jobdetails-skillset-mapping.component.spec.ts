import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobdetailsSkillsetMappingComponent } from './jobdetails-skillset-mapping.component';

describe('JobdetailsSkillsetMappingComponent', () => {
  let component: JobdetailsSkillsetMappingComponent;
  let fixture: ComponentFixture<JobdetailsSkillsetMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobdetailsSkillsetMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobdetailsSkillsetMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
