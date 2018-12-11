import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyFilterComponent } from './empty-filter.component';

describe('EmptyFilterComponent', () => {
  let component: EmptyFilterComponent;
  let fixture: ComponentFixture<EmptyFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
