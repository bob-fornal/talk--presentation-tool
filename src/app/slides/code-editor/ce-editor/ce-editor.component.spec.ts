import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeEditorComponent } from './ce-editor.component';

describe('CeEditorComponent', () => {
  let component: CeEditorComponent;
  let fixture: ComponentFixture<CeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CeEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
