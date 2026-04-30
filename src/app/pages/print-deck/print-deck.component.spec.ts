import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintDeckComponent } from './print-deck.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../_spec/mock-activated-route.spec';

import { CodeService } from '../../core/services/code.service';
import { MockCodeService } from '../../_spec/services/mock-code.service.spec';

describe('PrintDeckComponent', () => {
  let component: PrintDeckComponent;
  let fixture: ComponentFixture<PrintDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintDeckComponent],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: CodeService, useValue: MockCodeService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
