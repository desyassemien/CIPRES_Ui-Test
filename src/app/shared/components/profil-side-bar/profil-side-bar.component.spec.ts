import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilSideBarComponent } from './profil-side-bar.component';

describe('ProfilSideBarComponent', () => {
  let component: ProfilSideBarComponent;
  let fixture: ComponentFixture<ProfilSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
