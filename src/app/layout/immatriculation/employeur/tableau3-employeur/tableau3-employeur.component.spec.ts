import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableau3EmployeurComponent } from './tableau3-employeur.component';

describe('Tableau3EmployeurComponent', () => {
  let component: Tableau3EmployeurComponent;
  let fixture: ComponentFixture<Tableau3EmployeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableau3EmployeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tableau3EmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
