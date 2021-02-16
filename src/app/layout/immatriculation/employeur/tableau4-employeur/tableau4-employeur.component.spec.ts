import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableau4EmployeurComponent } from './tableau4-employeur.component';

describe('Tableau4EmployeurComponent', () => {
  let component: Tableau4EmployeurComponent;
  let fixture: ComponentFixture<Tableau4EmployeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableau4EmployeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tableau4EmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
