import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';

import { CodeService } from 'src/app/core/services/code.service';
import { MockCodeService } from 'src/app/_spec/services/mock-code.service.spec';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
      CoursesComponent,
    ],
    providers: [
      { provide: CodeService, useValue: MockCodeService },
    ]
});
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
