import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayStateAndDistrictComponent } from './display-state-and-district.component';

describe('DisplayStateAndDistrictComponent', () => {
  let component: DisplayStateAndDistrictComponent;
  let fixture: ComponentFixture<DisplayStateAndDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayStateAndDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayStateAndDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
