import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeDisplayComponent } from './ce-display.component';

import { NU_MONACO_EDITOR_CONFIG, NuMonacoEditorComponent } from '@ng-util/monaco-editor';

import { CodeService } from 'src/app/core/services/code.service';
import { MockCodeService } from 'src/app/_spec/services/mock-code.service.spec';

describe('CeDisplayComponent', () => {
  let component: CeDisplayComponent;
  let fixture: ComponentFixture<CeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CeDisplayComponent,

        NuMonacoEditorComponent,
      ],
      providers: [
        { provide: CodeService, useValue: MockCodeService },
        { provide: NU_MONACO_EDITOR_CONFIG, useValue: {} },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
