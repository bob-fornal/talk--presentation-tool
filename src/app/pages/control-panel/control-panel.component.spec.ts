import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelComponent } from './control-panel.component';

import { MatIconModule } from '@angular/material/icon';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../_spec/mock-activated-route.spec';

import { CodeService } from '../../core/services/code.service';
import { MockCodeService } from '../../_spec/services/mock-code.service.spec';

describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ControlPanelComponent,
      ],
      imports: [
        MatIconModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: CodeService, useValue: MockCodeService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
