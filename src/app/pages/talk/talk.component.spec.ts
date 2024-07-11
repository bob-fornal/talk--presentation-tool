import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkComponent } from './talk.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from 'src/app/_spec/mock-activated-route.spec';

import { CodeService } from 'src/app/core/services/code.service';
import { MockCodeService } from 'src/app/_spec/services/mock-code.service.spec';

describe('TalkComponent', () => {
  let component: TalkComponent;
  let fixture: ComponentFixture<TalkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TalkComponent],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: CodeService, useValue: MockCodeService },
      ]
    });

    fixture = TestBed.createComponent(TalkComponent);
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
