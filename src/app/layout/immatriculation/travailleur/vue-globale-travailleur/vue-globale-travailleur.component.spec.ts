import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueGlobaleTravailleurComponent } from './vue-globale-travailleur.component';

describe('VueGlobaleTravailleurComponent', () => {
  let component: VueGlobaleTravailleurComponent;
  let fixture: ComponentFixture<VueGlobaleTravailleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VueGlobaleTravailleurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VueGlobaleTravailleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
