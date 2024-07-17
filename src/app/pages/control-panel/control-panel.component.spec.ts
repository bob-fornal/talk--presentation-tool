import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelComponent } from './control-panel.component';

import { MatIconModule } from '@angular/material/icon';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../_spec/mock-activated-route.spec';

import { BroadcastMessage } from '../../core/interfaces/broadcast';
import { Structure } from '../../core/interfaces/structure';
import { Trigger } from '../../core/interfaces/triggers';

import { CodeService } from '../../core/services/code.service';
import { MockCodeService } from '../../_spec/services/mock-code.service.spec';

describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ControlPanelComponent,
      ],
      imports: [
        MatIconModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: CodeService, useValue: MockCodeService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "init" to set the path and key', () => {
    spyOn(component['title'], 'setTitle').and.stub();
    spyOn(component['code'], 'getStructure').and.stub();

    component.init();
    expect(component['title'].setTitle).toHaveBeenCalledWith('Presentation Control');
    expect(component.path).toEqual('FOLDER');
    expect(component.slideKey).toEqual('SLIDE-KEY');
    expect(component['code'].getStructure).toHaveBeenCalledWith('FOLDER');
  });

  it('expects "updateSidenavWidth @Hostlistener" to do nothing if is not resizing', () => {
    component.resizingEvent.isResizing = false;
    spyOn(component.sidenav, 'setSidenavWidth').and.stub();
    const event: MouseEvent = new MouseEvent('mousemove', {
      clientX: 0,
      clientY: 0,
    });
    
    component.updateSidenavWidth(event);
    expect(component.sidenav.setSidenavWidth).not.toHaveBeenCalled();
  });

  it('expects "updateSidenavWidth @Hostlistener" to set width', () => {
    component.resizingEvent.isResizing = true;
    spyOn(component.sidenav, 'setSidenavWidth').and.stub();
    const event: MouseEvent = new MouseEvent('mousemove', {
      clientX: 100,
      clientY: 100,
    });
    
    component.updateSidenavWidth(event);
    expect(component.sidenav.setSidenavWidth).toHaveBeenCalled();
  });

  it('expects "stopResizing" to set the resizing event to false', () => {
    component.resizingEvent.isResizing = true;

    component.stopResizing();
    expect(component.resizingEvent.isResizing).toEqual(false);
  });

  it('expects "startResizing" to take an event and set the state', () => {
    const event: MouseEvent = new MouseEvent('mousemove', {
      clientX: 100,
    });
    function getComputedStyle() {
      return {
        getPropertyValue: () => '120',
      };
    }
    component['sidenav'].getComputedStyle = getComputedStyle;

    component.startResizing(event);
    expect(component.resizingEvent.isResizing).toEqual(true);
    expect(component.resizingEvent.startingCursorX).toEqual(100);
    expect(component.resizingEvent.startingWidth).toEqual(120);
  });

  it('expects "handleStructure" to process the deck', () => {
    const structure: Structure = { ORDER: [], STYLE: [] };
    spyOn(component, 'getDeckTitle').and.stub();
    spyOn(component, 'getDeckSlide').and.stub();
    spyOn(component, 'setDeckStyle').and.stub();

    component.handleStructure(structure);
    expect(component.structure).toEqual(structure);
    expect(component.getDeckTitle).toHaveBeenCalledWith(structure);
    expect(component.getDeckSlide).toHaveBeenCalledWith('SLIDE-KEY');
    expect(component.setDeckStyle).toHaveBeenCalledWith(structure);
  });

  it('expects "handleFileUpdate" to set the selected file', () => {
    const message: BroadcastMessage = { type: 'TYPE', payload: { file: 'FILE' } };
    spyOn(component['cdr'], 'detectChanges').and.stub();

    component.handleFileUpdate(message);
    expect(component.selectedFile).toEqual('FILE');
  });

  it('expects "close" to close the window', () => {
    spyOn(component['service'], 'publish').and.stub();
    spyOn(component.window.self, 'close').and.stub();

    component.close();
    expect(component['service'].publish).toHaveBeenCalledWith({ type: 'control', payload: { type: 'close' } });
    expect(component.window.self.close).toHaveBeenCalled();
  });

  it('expects "getDeckTitle" to do nothing if structure ORDER is empty', () => {
    const strucuture: Structure = {
      ORDER: [],
      STYLE: [],
      key: { title: 'TITLE', type: 'TYPE' },
    };
    component.deckTitle = 'DECK-TITLE';

    component.getDeckTitle(strucuture);
    expect(component.deckTitle).toEqual('DECK-TITLE');
  });

  it('expects "getDeckTitle" to set title', () => {
    const strucuture: Structure = {
      ORDER: ['key'],
      STYLE: [],
      key: { title: 'TITLE', type: 'TYPE' },
    };
    component.deckTitle = 'DECK-TITLE';

    component.getDeckTitle(strucuture);
    expect(component.deckTitle).toEqual('TITLE');
  });

  it('expects "getDeckSlide" to do nothing if structure ORDER is empty', () => {
    const key: string = 'key';
    const strucuture: Structure = {
      ORDER: [],
      STYLE: [],
      key: { title: 'TITLE', type: 'TYPE' },
    };
    component.structure = strucuture;

    component.getDeckSlide(key);
    expect(component.deckSlide).not.toEqual({ title: 'TITLE', type: 'TYPE' });
  });

  it('expects "getDeckSlide" to set title', () => {
    const key: string = 'key';
    const strucuture: Structure = {
      ORDER: ['key'],
      STYLE: [],
      key: { title: 'TITLE', type: 'TYPE' },
    };
    component.structure = strucuture;

    component.getDeckSlide(key);
    expect(component.deckSlide).toEqual({ title: 'TITLE', type: 'TYPE' });
  });

  it('expects "getDeckStyle" to add the style', () => {
    const structure: Structure = { ORDER: [], STYLE: ['style1', 'style2', 'style3'] };
    spyOn(component['style'], 'add').and.stub();

    component.setDeckStyle(structure);
    expect(component['style'].add).toHaveBeenCalledWith('style1\nstyle2\nstyle3');
  });

  it('expects "getActive" to return active state', () => {
    const key: string = 'SLIDE-KEY';

    const result: boolean = component.getActive(key);
    expect(result).toEqual(true);
  });

  it('expects "getTitle" to return title slide if index is zero (0)', () => {
    const key: string = 'key';
    const index: number = 0;

    const result: string = component.getTitle(key, index);
    expect(result).toEqual('1. Title Slide');
  });

  it('expects "getTitle" to return index plus one (+1) questions', () => {
    const key: string = 'time-for-questions';
    const index: number = 10;

    const result: string = component.getTitle(key, index);
    expect(result).toEqual('11. Questions');
  });

  it('expects "getTitle" to get a title from the structure (title)', () => {
    const structure: Structure = { ORDER: [], STYLE: [], key: { title: 'TITLE', type: 'TYPE' } };
    const key: string = 'key';
    const index: number = 20;
    component.structure = structure;

    const result: string = component.getTitle(key, index);
    expect(result).toEqual('21. TITLE');
  });

  it('expects "getTitle" to get a title from the structure (key)', () => {
    const structure: Structure = { ORDER: [], STYLE: [], key: { title: '', type: 'TYPE' } };
    const key: string = 'key';
    const index: number = 20;
    component.structure = structure;

    const result: string = component.getTitle(key, index);
    expect(result).toEqual('21. key');
  });

  it('expects "changePage" to publish and change page', () => {
    const key: string = 'KEY';
    component.structure.ORDER = [key];
    component.path = 'PATH';
    spyOn(component['service'], 'publish').and.stub();
    spyOn(component['router'], 'navigate').and.stub();
    spyOn(component, 'getDeckSlide').and.stub();
    const message: BroadcastMessage = { type: 'control', payload: { type: 'navigate', to: key, index: 0 } };

    component.changePage(key);
    expect(component['service'].publish).toHaveBeenCalledWith(message);
    expect(component['router'].navigate).toHaveBeenCalledWith(['control-panel', 'PATH', key]);
    expect(component.slideKey).toEqual(key);
    expect(component.getDeckSlide).toHaveBeenCalledWith(key);
  });

  it('expects "triggerConsole" to build and publish a toggle open payload', () => {
    const type: string = 'toggle-open';
    let message: BroadcastMessage = { type: 'control', payload: { type: 'toggle-console'} };
    spyOn(component['service'], 'publish').and.stub();

    component.triggerConsole(type);
    expect(component['service'].publish).toHaveBeenCalledWith(message);
  });

  it('expects "triggerConsole" to build and publish a clear payload', () => {
    const type: string = 'clear';
    let message: BroadcastMessage = { type: 'control', payload: { type: 'trigger-clear'} };
    spyOn(component['service'], 'publish').and.stub();

    component.triggerConsole(type);
    expect(component['service'].publish).toHaveBeenCalledWith(message);
  });

  it('expects "triggerFileChange" to broadcase the file', () => {
    const file: string = 'FILE';
    const message: BroadcastMessage = { type: 'control', payload: { type: 'trigger-file', file } };
    spyOn(component['service'], 'publish').and.stub();

    component.triggerFileChange(file);
    expect(component['service'].publish).toHaveBeenCalledWith(message);
  });

  it('expects "triggerFileSelection" to broadcast the selection', () => {
    const trigger: Trigger = { title: 'TITLE', file: 'FILE', init: 'INIT' };
    const message: BroadcastMessage = { type: 'control', payload: { type: 'trigger-code', trigger } };
    spyOn(component['service'], 'publish').and.stub();

    component.triggerFileSelection(trigger);
    expect(component['service'].publish).toHaveBeenCalledWith(message);
  });

  it('expects "triggerFontsizeChange" to broadcast the fontsize change', () => {
    const fontsize: string = 'FONTSIZE';
    const message: BroadcastMessage = { type: 'control', payload: { type: 'trigger-fontsize', fontsize } };
    spyOn(component['service'], 'publish').and.stub();

    component.triggerFontsizeChange(fontsize);
    expect(component['service'].publish).toHaveBeenCalledWith(message);
  });

  it('expects "stripHTML" to remove HTML from the string', () => {
    const html: string = '<div>HTML</div>';
    const expected: string = 'HTML';

    const result: string = component.stripHTML(html);
    expect(result).toEqual(expected);
  });
});
