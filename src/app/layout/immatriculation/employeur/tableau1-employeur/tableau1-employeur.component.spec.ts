import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableau1EmployeurComponent } from './tableau1-employeur.component';

describe('Tableau1EmployeurComponent', () => {
  let component: Tableau1EmployeurComponent;
  let fixture: ComponentFixture<Tableau1EmployeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableau1EmployeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tableau1EmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
