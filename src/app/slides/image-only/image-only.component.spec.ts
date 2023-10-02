import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageOnlyComponent } from './image-only.component';

describe('ImageOnlyComponent', () => {
  let component: ImageOnlyComponent;
  let fixture: ComponentFixture<ImageOnlyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageOnlyComponent]
    });
    fixture = TestBed.createComponent(ImageOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
