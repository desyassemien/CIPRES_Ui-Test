import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableau5Component } from './tableau5.component';

describe('Tableau5Component', () => {
  let component: Tableau5Component;
  let fixture: ComponentFixture<Tableau5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableau5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tableau5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
