import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTextComponent } from './image-text.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from 'src/app/_spec/mock-activated-route.spec';

describe('ImageTextComponent', () => {
  let component: ImageTextComponent;
  let fixture: ComponentFixture<ImageTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ImageTextComponent],
    providers: [
      { provide: ActivatedRoute, useValue: MockActivatedRoute },
    ]
});
    fixture = TestBed.createComponent(ImageTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
