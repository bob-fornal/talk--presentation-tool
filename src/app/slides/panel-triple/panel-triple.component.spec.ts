import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTripleComponent } from './panel-triple.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { EditButtonsComponent } from '../../shared/edit-buttons/edit-buttons.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../_spec/mock-activated-route.spec';

describe('PanelTripleComponent', () => {
  let component: PanelTripleComponent;
  let fixture: ComponentFixture<PanelTripleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PanelTripleComponent,
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

    fixture = TestBed.createComponent(PanelTripleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
