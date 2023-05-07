import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSkillSetComponent } from './view-skill-set.component';

describe('ViewSkillSetComponent', () => {
  let component: ViewSkillSetComponent;
  let fixture: ComponentFixture<ViewSkillSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSkillSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSkillSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
