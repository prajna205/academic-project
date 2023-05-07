import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleRoundsComponent } from './view-single-rounds.component';

describe('ViewSingleRoundsComponent', () => {
  let component: ViewSingleRoundsComponent;
  let fixture: ComponentFixture<ViewSingleRoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSingleRoundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
