import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationOverEditComponent } from './creation-over-edit.component';

describe('CreationOverEditComponent', () => {
  let component: CreationOverEditComponent;
  let fixture: ComponentFixture<CreationOverEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationOverEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationOverEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
