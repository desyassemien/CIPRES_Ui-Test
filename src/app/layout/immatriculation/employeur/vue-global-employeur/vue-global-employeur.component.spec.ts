import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueGlobalEmployeurComponent } from './vue-global-employeur.component';

describe('VueGlobalEmployeurComponent', () => {
  let component: VueGlobalEmployeurComponent;
  let fixture: ComponentFixture<VueGlobalEmployeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VueGlobalEmployeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VueGlobalEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
