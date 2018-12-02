import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextualDocsComponent } from './contextual-docs.component';

describe('ContextualDocsComponent', () => {
  let component: ContextualDocsComponent;
  let fixture: ComponentFixture<ContextualDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextualDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextualDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
