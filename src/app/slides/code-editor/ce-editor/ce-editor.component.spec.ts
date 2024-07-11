import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeEditorComponent } from './ce-editor.component';

import { MatDialogModule } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from 'src/app/_spec/mock-activated-route.spec';

describe('CeEditorComponent', () => {
  let component: CeEditorComponent;
  let fixture: ComponentFixture<CeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CeEditorComponent,
      
        MatDialogModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CeEditorComponent);
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
