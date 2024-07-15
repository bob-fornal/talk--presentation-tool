import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { EditComponent } from './edit.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../_spec/mock-activated-route.spec';

import { Talk } from '../../core/interfaces/talks';

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

  it('expects "get dataChanged" to return true if any slide has changed', () => {
    component.keyStatuses = [
      { key: 'key1', included: true },
    ]
    spyOn(component, 'isNotOriginal').and.returnValue(true);

    const result: boolean = component.dataChanged;
    expect(result).toEqual(true);
  });

  it('expects "get dataChanged" to return false if no slide has changed', () => {
    component.keyStatuses = [
      { key: 'key1', included: true },
    ]
    spyOn(component, 'isNotOriginal').and.returnValue(false);

    const result: boolean = component.dataChanged;
    expect(result).toEqual(false);
  });

  it('expects "init" to initialize and not set the talk', () => {
    const talks: Array<Talk> = [
      { folder: 'PATH1', title: 'PATH1', tags: ['1', '2', '3'] },
      { folder: 'PATH2', title: 'PATH2', tags: ['4', '5', '6'] },
      { folder: 'PATH3', title: 'PATH3', tags: ['7', '8', '9'] },
    ];
    component.path = 'PATH';
    component.talks = talks;
    component.title = '';
    component.tags = [];
    spyOn(component, 'initDisplayAs').and.stub();
    spyOn(component, 'initPath').and.stub();
    spyOn(component, 'initSlideKey').and.stub();

    component.init();
    expect(component.initDisplayAs).toHaveBeenCalled();
    expect(component.initPath).toHaveBeenCalled();
    expect(component.initSlideKey).toHaveBeenCalled();
    expect(component.title).toEqual('');
    expect(component.tags).toEqual([]);
  });

  it('expects "init" to initialize and set the talk', () => {
    const talks: Array<Talk> = [
      { folder: 'PATH1', title: 'PATH1', tags: ['1', '2', '3'] },
      { folder: 'PATH2', title: 'PATH2', tags: ['4', '5', '6'] },
      { folder: 'PATH3', title: 'PATH3', tags: ['7', '8', '9'] },
    ];
    component.path = 'PATH1';
    component.talks = talks;
    component.title = '';
    component.tags = [];
    spyOn(component, 'initDisplayAs').and.stub();
    spyOn(component, 'initPath').and.stub();
    spyOn(component, 'initSlideKey').and.stub();

    component.init();
    expect(component.initDisplayAs).toHaveBeenCalled();
    expect(component.initPath).toHaveBeenCalled();
    expect(component.initSlideKey).toHaveBeenCalled();
    expect(component.title).toEqual('PATH1');
    expect(component.tags).toEqual(['1', '2', '3']);
  });

  it('expects "initDisplayAs" to get null from storage and set display to "cards"', () => {
    spyOn(component.localStorage, 'getItem').and.returnValue(null);
    spyOn(component['cdr'], 'detectChanges').and.stub();

    component.initDisplayAs();
    expect(component.displayAs).toEqual('cards');
    expect(component['cdr'].detectChanges).toHaveBeenCalled();
  });

  it('expects "initDisplayAs" to get the value from storage and set display', () => {
    spyOn(component.localStorage, 'getItem').and.returnValue('list');
    spyOn(component['cdr'], 'detectChanges').and.stub();

    component.initDisplayAs();
    expect(component.displayAs).toEqual('list');
    expect(component['cdr'].detectChanges).toHaveBeenCalled();
  });

  it('expects "initPath" to get the path and structure', () => {
    spyOn(component['code'], 'getStructure').and.stub();

    component.initPath();
    expect(component['code'].getStructure).toHaveBeenCalledWith('FOLDER');
  });

  it('expects "initSlideKey" to get the slide key and editing state', () => {
    component.initSlideKey();
    expect(component.slideKey).toEqual('SLIDE-KEY');
    expect(component.editing).toEqual(true);
  });

  it('expects "handleChange" to set the height to the scrollHeight', () => {
    const event: any = {
      target: {
        scrollHeight: 100,
        style: {
          height: '',
        },
      },
    };

    component.handleChange(event);
    expect(event.target.style.height).toEqual('100px');
  });
});
