import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingComponent } from './polling.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../_spec/mock-activated-route.spec';

import { CodeService } from '../../core/services/code.service';
import { MockCodeService } from '../../_spec/services/mock-code.service.spec';

describe('PollingComponent', () => {
  let component: PollingComponent;
  let fixture: ComponentFixture<PollingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PollingComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: CodeService, useValue: MockCodeService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
