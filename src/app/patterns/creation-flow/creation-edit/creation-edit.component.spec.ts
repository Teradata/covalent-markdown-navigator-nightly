import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationEditComponent } from './creation-edit.component';

describe('CreationEditComponent', () => {
  let component: CreationEditComponent;
  let fixture: ComponentFixture<CreationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
