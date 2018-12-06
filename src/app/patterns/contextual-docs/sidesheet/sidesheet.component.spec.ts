import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidesheetComponent } from './sidesheet.component';

describe('SidesheetComponent', () => {
  let component: SidesheetComponent;
  let fixture: ComponentFixture<SidesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
