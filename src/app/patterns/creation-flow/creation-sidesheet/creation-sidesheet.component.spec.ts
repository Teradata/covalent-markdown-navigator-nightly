import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationSidesheetComponent } from './creation-sidesheet.component';

describe('CreationSidesheetComponent', () => {
  let component: CreationSidesheetComponent;
  let fixture: ComponentFixture<CreationSidesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationSidesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationSidesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
