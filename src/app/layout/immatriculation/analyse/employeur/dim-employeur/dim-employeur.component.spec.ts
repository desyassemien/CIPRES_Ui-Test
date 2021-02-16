import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimEmployeurComponent } from './dim-employeur.component';

describe('DimEmployeurComponent', () => {
  let component: DimEmployeurComponent;
  let fixture: ComponentFixture<DimEmployeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DimEmployeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DimEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
