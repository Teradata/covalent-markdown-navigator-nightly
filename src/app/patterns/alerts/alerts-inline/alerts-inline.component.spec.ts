import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsInlineComponent } from './alerts-inline.component';

describe('AlertsInlineComponent', () => {
  let component: AlertsInlineComponent;
  let fixture: ComponentFixture<AlertsInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
