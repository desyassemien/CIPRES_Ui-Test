import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableau6Component } from './tableau6.component';

describe('Tableau6Component', () => {
  let component: Tableau6Component;
  let fixture: ComponentFixture<Tableau6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableau6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tableau6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
