import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOverComponent } from './card-over.component';

describe('CardOverComponent', () => {
  let component: CardOverComponent;
  let fixture: ComponentFixture<CardOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
