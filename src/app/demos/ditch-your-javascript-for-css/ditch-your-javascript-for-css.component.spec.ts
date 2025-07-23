import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DitchYourJavascriptForCssComponent } from './ditch-your-javascript-for-css.component';

describe('DitchYourJavascriptForCssComponent', () => {
  let component: DitchYourJavascriptForCssComponent;
  let fixture: ComponentFixture<DitchYourJavascriptForCssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DitchYourJavascriptForCssComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DitchYourJavascriptForCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
