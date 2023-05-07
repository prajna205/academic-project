import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleUserInfoComponent } from './view-single-user-info.component';

describe('ViewSingleUserInfoComponent', () => {
  let component: ViewSingleUserInfoComponent;
  let fixture: ComponentFixture<ViewSingleUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSingleUserInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
