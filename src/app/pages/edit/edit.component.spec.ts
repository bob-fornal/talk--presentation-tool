import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { EditComponent } from './edit.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../_spec/mock-activated-route.spec';

import { CodeService } from '../../core/services/code.service';
import { MockCodeService } from '../../_spec/services/mock-code.service.spec';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditComponent
      ],
      imports: [
        MatButtonToggleModule,
        MatIconModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: CodeService, useValue: MockCodeService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
