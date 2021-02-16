import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableau10Component } from './tableau10.component';

describe('Tableau10Component', () => {
  let component: Tableau10Component;
  let fixture: ComponentFixture<Tableau10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableau10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tableau10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
