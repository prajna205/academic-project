import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleSkillSetComponent } from './view-single-skill-set.component';

describe('ViewSingleSkillSetComponent', () => {
  let component: ViewSingleSkillSetComponent;
  let fixture: ComponentFixture<ViewSingleSkillSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSingleSkillSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleSkillSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
