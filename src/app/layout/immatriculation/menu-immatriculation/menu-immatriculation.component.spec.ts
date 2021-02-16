import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuImmatriculationComponent } from './menu-immatriculation.component';

describe('MenuImmatriculationComponent', () => {
  let component: MenuImmatriculationComponent;
  let fixture: ComponentFixture<MenuImmatriculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuImmatriculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuImmatriculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
