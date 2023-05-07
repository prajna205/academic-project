import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSkillSetComponent } from './edit-skill-set.component';

describe('EditSkillSetComponent', () => {
  let component: EditSkillSetComponent;
  let fixture: ComponentFixture<EditSkillSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSkillSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSkillSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
