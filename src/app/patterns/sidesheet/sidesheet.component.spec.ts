import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsSideSheetComponent } from './sidesheet.component';

describe('DocsSideSheetComponent', () => {
  let component: DocsSideSheetComponent;
  let fixture: ComponentFixture<DocsSideSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsSideSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsSideSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
