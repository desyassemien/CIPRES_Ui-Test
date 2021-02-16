import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauxTravailleurComponent } from './tableaux-travailleur.component';

describe('TableauxTravailleurComponent', () => {
  let component: TableauxTravailleurComponent;
  let fixture: ComponentFixture<TableauxTravailleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauxTravailleurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauxTravailleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
