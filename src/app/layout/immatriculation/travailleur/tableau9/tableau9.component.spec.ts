import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableau9Component } from './tableau9.component';

describe('Tableau9Component', () => {
  let component: Tableau9Component;
  let fixture: ComponentFixture<Tableau9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableau9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tableau9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
