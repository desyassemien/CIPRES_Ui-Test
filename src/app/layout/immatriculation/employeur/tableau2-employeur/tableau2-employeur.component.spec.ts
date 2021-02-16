import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tableau2EmployeurComponent } from './tableau2-employeur.component';

describe('Tableau2EmployeurComponent', () => {
  let component: Tableau2EmployeurComponent;
  let fixture: ComponentFixture<Tableau2EmployeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tableau2EmployeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tableau2EmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
