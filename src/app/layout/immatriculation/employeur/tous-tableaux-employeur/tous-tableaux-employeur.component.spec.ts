import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TousTableauxEmployeurComponent } from './tous-tableaux-employeur.component';

describe('TousTableauxEmployeurComponent', () => {
  let component: TousTableauxEmployeurComponent;
  let fixture: ComponentFixture<TousTableauxEmployeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TousTableauxEmployeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TousTableauxEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
