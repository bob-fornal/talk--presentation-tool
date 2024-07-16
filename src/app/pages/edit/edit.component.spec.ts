import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { EditComponent } from './edit.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../_spec/mock-activated-route.spec';

import { KeyStatuses } from '../../core/interfaces/key-statuses';
import { Structure } from '../../core/interfaces/structure';
import { Talk, Talks } from '../../core/interfaces/talks';

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

  it('expects "handleStructure" to do hoting if processed and matches', () => {
    const structure: Structure = { ORDER: [], STYLE: [] };
    spyOn(component, 'isProcessedAndMatches').and.returnValue(true);
    spyOn(component, 'handleSlideKeyData').and.stub();
    spyOn(component, 'handleKeyStatuses').and.stub();

    component.handleStructure(structure);
    expect(component.handleSlideKeyData).not.toHaveBeenCalled();
    expect(component.handleKeyStatuses).not.toHaveBeenCalled();
  });

  it('expects "handleStructure" to process slide key data', () => {
    const structure: Structure = { ORDER: [], STYLE: [] };
    spyOn(component, 'isProcessedAndMatches').and.returnValue(false);
    spyOn(component, 'handleSlideKeyData').and.stub();
    spyOn(component, 'handleKeyStatuses').and.stub();
    component.slideKey = 'SLIDE-KEY';

    component.handleStructure(structure);
    expect(component.handleSlideKeyData).toHaveBeenCalledWith('SLIDE-KEY');
    expect(component.handleKeyStatuses).not.toHaveBeenCalled();
  });

  it('expects "handleStructure" to handle key statuses', () => {
    const structure: Structure = { ORDER: [], STYLE: [] };
    spyOn(component, 'isProcessedAndMatches').and.returnValue(false);
    spyOn(component, 'handleSlideKeyData').and.stub();
    spyOn(component, 'handleKeyStatuses').and.stub();
    component.slideKey = null;

    component.handleStructure(structure);
    expect(component.handleSlideKeyData).not.toHaveBeenCalled();
    expect(component.handleKeyStatuses).toHaveBeenCalled();
  });

  it('expects "isProcessedAndMatches" to return false if processed is false', () => {
    const order: Array<string> = [];
    component['service'].structure = { ORDER: [], STYLE: [] };
    component.slideKey = null;

    const result: boolean = component.isProcessedAndMatches(order);
    expect(result).toEqual(false);
  });

  it('expects "isProcessedAndMatches" to return false if match is false', () => {
    const order: Array<string> = ['ITEM1'];
    component['service'].structure = { ORDER: [], STYLE: [], PROCESSED: [] };
    component.slideKey = null;

    const result: boolean = component.isProcessedAndMatches(order);
    expect(result).toEqual(false);
  });

  it('expects "isProcessedAndMatches" to return false if slideKey is false', () => {
    const order: Array<string> = [];
    component['service'].structure = { ORDER: [], STYLE: [], PROCESSED: [] };
    component.slideKey = 'SLIDE-KEY';

    const result: boolean = component.isProcessedAndMatches(order);
    expect(result).toEqual(false);
  });

  it('expects "handleSlideKeyData" to set the edited structure', () => {
    component['service'].edited = {
      'KEY': { title: 'TITLE', type: 'EDITED-TYPE' }
    };
    component['service'].structure = {
      ORDER: [],
      STYLE: [],
      'KEY': { title: 'TITLE', type: 'STRUCTURE-TYPE' }
    };

    component.handleSlideKeyData('KEY');
    expect(component.type).toEqual('EDITED-TYPE');
  });

  it('expects "handleSlideKeyData" to set the edited structure', () => {
    component['service'].edited = {
      'NOT-KEY': { title: 'TITLE', type: 'EDITED-TYPE' }
    };
    component['service'].structure = {
      ORDER: [],
      STYLE: [],
      'KEY': { title: 'TITLE', type: 'STRUCTURE-TYPE' }
    };

    component.handleSlideKeyData('KEY');
    expect(component.type).toEqual('STRUCTURE-TYPE');
  });

  it('expects "handleKeyStatuses" to process keys on service structure and set included states', () => {
    component['service'].structure = {
      ORDER: ['KEY1', 'KEY3'],
      STYLE: [],
      'KEY1': { title: 'TITLE', type: 'STRUCTURE-TYPE' },
      'KEY2': { title: 'TITLE', type: 'STRUCTURE-TYPE' },
      'KEY3': { title: 'TITLE', type: 'STRUCTURE-TYPE' },
    };
    const expected: Array<KeyStatuses> = [
      { key: 'KEY1', included: true },
      { key: 'KEY2', included: false },
      { key: 'KEY3', included: true },
    ];

    component.handleKeyStatuses();
    expect(component.keyStatuses).toEqual(expected);
  });

  it('expects "handleTalks" to find talk based on path', () => {
    component.path = 'FOLDER2';
    const wrapper: Talks = {
      STYLE: [],
      TAGS: [],
      TALKS: [
        { folder: 'FOLDER1', title: 'TITLE1', tags: [] },
        { folder: 'FOLDER2', title: 'TITLE2', tags: [] },
        { folder: 'FOLDER3', title: 'TITLE3', tags: [] },
      ],
    };

    component.handleTalks(wrapper);
    expect(component.title).toEqual('TITLE2');
  });

  it('expects "handleTalks" to set all talks', () => {
    component.path = '';
    const wrapper: Talks = {
      STYLE: [],
      TAGS: [],
      TALKS: [
        { folder: 'FOLDER1', title: 'TITLE1', tags: [] },
        { folder: 'FOLDER2', title: 'TITLE2', tags: [] },
        { folder: 'FOLDER3', title: 'TITLE3', tags: [] },
      ],
    };

    component.handleTalks(wrapper);
    expect(component.talks).toEqual(wrapper.TALKS);
  });

  it('expects "getSlideIcon" to return dynamic type and icon', () => {
    const key: string = 'KEY';
    spyOn(component, 'getStructureType').and.returnValue(key);
    component.icons[key] = { type: 'TYPE', icon: 'ICON' };

    const result: { type: string; icon: string } = component.getSlideIcon(key);
    expect(result).toEqual({ type: 'TYPE', icon: 'ICON' });
    delete component.icons[key];
  });

  it('expects "getSlideIcon" to return a default', () => {
    const key: string = 'KEY';
    spyOn(component, 'getStructureType').and.returnValue(key);
    delete component.icons[key];

    const result: { type: string; icon: string } = component.getSlideIcon(key);
    expect(result).toEqual({ type: 'icon', icon: 'image' });
  });

  it('expects "getSlidePatternTitle" to get the title', () => {
    const key: string = 'KEY';
    component['service'].structure[key] = { title: 'TITLE', type: 'TEST' };

    const result: string = component.getSlidePatternTitle(key);
    expect(result).toEqual('TITLE');
    delete component['service'].structure[key];
  });

  it('expects "getSlidePatternTitle" to get NO TITLE', () => {
    const key: string = 'KEY';
    delete component['service'].structure[key];

    const result: string = component.getSlidePatternTitle(key);
    expect(result).toEqual('NO TITLE');
  });

  it('expects "getStructureType" to return the correct type', () => {
    const key: string = 'KEY';
    component['service'].structure[key] = { title: 'TITLE', type: 'TEST' };

    const result: string = component.getStructureType(key);
    expect(result).toEqual('TEST');
    delete component['service'].structure[key];
  });

  it('expects "getStyle" to return the correct style', () => {
    component['service'].structure.STYLE = ['style1', 'style2', 'style3'];
    const expected: string = 'style1\nstyle2\nstyle3';

    const result: string = component.getStyle();
    expect(result).toEqual(expected);
  });

  it('expects "getValue" to return the correct value', () => {
    const slideKey: string = 'SLIDE-KEY';
    const itemKey: string = 'ITEM-KEY';
    component['service'].structure[slideKey] = { title: '', type: '', [itemKey]: 'ITEM-VALUE' };

    const result: string = component.getValue(slideKey, itemKey);
    expect(result).toEqual('ITEM-VALUE');
  });

  it('expects "getCode" to get the HTML and add line breaks', () => {
    const slideKey: string = 'SLIDE-KEY';
    const itemKey: string = 'ITEM-KEY';
    const code: string = '<div>Test1</div><div>Test2</div>';
    const expected: string = '<div>Test1</div>\n<div>Test2</div>\n';
    component['service'].structure[slideKey] = { title: '', type: '', [itemKey]: code };

    const result: string = component.getCode(slideKey, itemKey);
    expect(result).toEqual(expected);
  });

  it('expects "editClasses" to return the correct classes', () => {
    const slideKey: string = 'SLIDE-KEY';
    spyOn(component, 'getStructureType').and.returnValue('STRUCTURE-TYPE');
    const expected: Array<string> = ['slide-card', 'STRUCTURE-TYPE'];

    const result: Array<string> = component.editClasses(slideKey);
    expect(result).toEqual(expected);
  });

  it('expects "editEvent" to navigate correctly', () => {
    const slideKey: string = 'SLIDE-KEY';
    spyOn(component['router'], 'navigate').and.stub();
    component.path = 'PATH'

    component.editEvent(slideKey);
    expect(component['router'].navigate).toHaveBeenCalledWith(['edit', 'PATH', slideKey]);
  });

  it('expects "handleDataSave" to nothing if event ACTION is not save', () => {
    const event: any = { ACTION: 'not-save' };
    component['service'].edited = {};

    component.handleDataSave(event);
    expect(component['service'].edited).toEqual({});
  });

  it('expects "handleDataSave" to save if not changed', () => {
    const event: any = {
      ACTION: 'save',
      slideKey: 'SLIDE-KEY',
      ITEMS: ['title', 'type'],
      title: 'TITLE',
      type: 'TYPE'
    };
    component['service'].structure = { ORDER: [], STYLE: [] };
    component['service'].structure[event.slideKey] = { title: 'TITLE', type: 'TYPE' };
    component['service'].edited = { 'SLIDE-KEY': { title: 'TITLE', type: 'TYPE' } };

    component.handleDataSave(event);
    expect(component['service'].edited).toEqual({});
  });

  it('expects "handleDataSave" to save if changed', () => {
    const event: any = {
      ACTION: 'save',
      slideKey: 'SLIDE-KEY',
      ITEMS: ['title', 'type'],
      title: 'NEW-TITLE',
      type: 'NEW-TYPE'
    };
    component['service'].structure = { ORDER: [], STYLE: [] };
    component['service'].structure[event.slideKey] = { title: 'TITLE', type: 'TYPE' };
    component['service'].edited = {};

    component.handleDataSave(event);
    expect(component['service'].edited).toEqual({ 'SLIDE-KEY': { title: 'NEW-TITLE', type: 'NEW-TYPE' } });
  });

  it('expects "saveFile" to save the JSON file', () => {
    spyOn(component, 'saveAs').and.stub();

    component.saveFile();
    expect(component.saveAs).toHaveBeenCalled();
  });
});
