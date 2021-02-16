import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableau8Component } from './tableau8.component';

describe('Tableau8Component', () => {
  let component: Tableau8Component;
  let fixture: ComponentFixture<Tableau8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableau8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tableau8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
