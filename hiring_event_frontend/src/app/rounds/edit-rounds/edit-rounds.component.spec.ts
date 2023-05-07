import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoundsComponent } from './edit-rounds.component';

describe('EditRoundsComponent', () => {
  let component: EditRoundsComponent;
  let fixture: ComponentFixture<EditRoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRoundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
