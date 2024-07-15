import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTextComponent } from './image-text.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { EditButtonsComponent } from '../../shared/edit-buttons/edit-buttons.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../_spec/mock-activated-route.spec';

describe('ImageTextComponent', () => {
  let component: ImageTextComponent;
  let fixture: ComponentFixture<ImageTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ImageTextComponent,
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

    fixture = TestBed.createComponent(ImageTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
