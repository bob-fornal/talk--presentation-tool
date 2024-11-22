import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSingleTableComponent } from './panel-single-table.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../_spec/mock-activated-route.spec';

import { MockEditButtonsComponent } from '../../_spec/components/mock-edit-buttons.component.spec';

describe('PanelSingleTableComponent', () => {
  let component: PanelSingleTableComponent;
  let fixture: ComponentFixture<PanelSingleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PanelSingleTableComponent,

        MockEditButtonsComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelSingleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
