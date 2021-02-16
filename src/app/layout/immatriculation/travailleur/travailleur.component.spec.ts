import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravailleurComponent } from './travailleur.component';

describe('TravailleurComponent', () => {
  let component: TravailleurComponent;
  let fixture: ComponentFixture<TravailleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravailleurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravailleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
