import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableau7Component } from './tableau7.component';

describe('Tableau7Component', () => {
  let component: Tableau7Component;
  let fixture: ComponentFixture<Tableau7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableau7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tableau7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
