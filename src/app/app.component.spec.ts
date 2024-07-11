import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

import { CodeService } from './core/services/code.service';
import { LoggingService } from './core/services/logging.service';

import { MockCodeService } from './_spec/services/mock-code.service.spec';
import { MockLoggingService } from './_spec/services/mock-logging.service.spec';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: CodeService, useValue: MockCodeService },
        { provide: LoggingService, useValue: MockLoggingService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
    window.onbeforeunload = jasmine.createSpy();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('expects "init" to initialize code and logging', async () => {
    spyOn(component['code'], 'init').and.stub();
    spyOn(component['logging'], 'initLogging').and.stub();

    await component.init();
    expect(component['code'].init).toHaveBeenCalled();
    expect(component['logging'].initLogging).toHaveBeenCalled();
  });
});
