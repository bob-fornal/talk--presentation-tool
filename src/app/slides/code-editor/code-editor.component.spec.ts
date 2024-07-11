import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEditorComponent } from './code-editor.component';

import { MatDialogModule } from '@angular/material/dialog';

import { MockCeDisplayComponent } from 'src/app/_spec/components/mock-ce-display.component.spec';
import { MockCeEditorComponent } from 'src/app/_spec/components/mock-ce-editor.component.spec';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from 'src/app/_spec/mock-activated-route.spec';

import { CodeService } from 'src/app/core/services/code.service';
import { MockCodeService } from 'src/app/_spec/services/mock-code.service.spec';

import { NU_MONACO_EDITOR_CONFIG } from '@ng-util/monaco-editor';

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
      CodeEditorComponent,
      MockCeDisplayComponent,
      MockCeEditorComponent,

      MatDialogModule,
    ],
    providers: [
      { provide: ActivatedRoute, useValue: MockActivatedRoute },
      { provide: CodeService, useValue: MockCodeService },
      { provide: NU_MONACO_EDITOR_CONFIG, useValue: {} },
    ]
});
    fixture = TestBed.createComponent(CodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
