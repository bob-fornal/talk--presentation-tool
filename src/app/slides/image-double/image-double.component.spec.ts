/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDoubleComponent } from './image-double.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { EditButtonsComponent } from '../../shared/edit-buttons/edit-buttons.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../_spec/mock-activated-route.spec';

describe('ImageDoubleComponent', () => {
  let component: ImageDoubleComponent;
  let fixture: ComponentFixture<ImageDoubleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ImageDoubleComponent,
        EditButtonsComponent,
      ],
      imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
