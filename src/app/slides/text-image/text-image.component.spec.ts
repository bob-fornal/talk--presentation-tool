import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextImageComponent } from './text-image.component';

describe('TextImageComponent', () => {
  let component: TextImageComponent;
  let fixture: ComponentFixture<TextImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextImageComponent]
    });
    fixture = TestBed.createComponent(TextImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
