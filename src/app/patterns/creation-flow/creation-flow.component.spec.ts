import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationFlowComponent } from './creation-flow.component';

describe('CreationFlowComponent', () => {
  let component: CreationFlowComponent;
  let fixture: ComponentFixture<CreationFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
