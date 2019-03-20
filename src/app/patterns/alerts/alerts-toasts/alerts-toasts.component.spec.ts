import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsToastsComponent } from './alerts-toasts.component';

describe('AlertsToastsComponent', () => {
  let component: AlertsToastsComponent;
  let fixture: ComponentFixture<AlertsToastsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsToastsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsToastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
