import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBordHeaderComponent } from './dash-bord-header.component';

describe('DashBordHeaderComponent', () => {
  let component: DashBordHeaderComponent;
  let fixture: ComponentFixture<DashBordHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashBordHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBordHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
