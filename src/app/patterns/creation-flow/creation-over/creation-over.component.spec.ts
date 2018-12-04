import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationOverComponent } from './creation-over.component';

describe('CreationOverComponent', () => {
  let component: CreationOverComponent;
  let fixture: ComponentFixture<CreationOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationOverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
