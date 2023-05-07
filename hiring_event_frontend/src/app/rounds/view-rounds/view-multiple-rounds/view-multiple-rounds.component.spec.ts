import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMultipleRoundsComponent } from './view-multiple-rounds.component';

describe('ViewMultipleRoundsComponent', () => {
  let component: ViewMultipleRoundsComponent;
  let fixture: ComponentFixture<ViewMultipleRoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMultipleRoundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMultipleRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
