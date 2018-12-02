import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavStepperComponent } from './nav-stepper.component';

describe('NavStepperComponent', () => {
  let component: NavStepperComponent;
  let fixture: ComponentFixture<NavStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
