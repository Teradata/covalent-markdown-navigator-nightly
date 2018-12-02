import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniSideNavComponent } from './mini-side-nav.component';

describe('MiniSideNavComponent', () => {
  let component: MiniSideNavComponent;
  let fixture: ComponentFixture<MiniSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
