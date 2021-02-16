import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiThemeSettingComponent } from './ui-theme-setting.component';

describe('UiThemeSettingComponent', () => {
  let component: UiThemeSettingComponent;
  let fixture: ComponentFixture<UiThemeSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiThemeSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiThemeSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
