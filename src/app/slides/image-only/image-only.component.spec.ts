import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageOnlyComponent } from './image-only.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from 'src/app/_spec/mock-activated-route.spec';

describe('ImageOnlyComponent', () => {
  let component: ImageOnlyComponent;
  let fixture: ComponentFixture<ImageOnlyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImageOnlyComponent],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
      ]
    });

    fixture = TestBed.createComponent(ImageOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
    window.onbeforeunload = jasmine.createSpy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
