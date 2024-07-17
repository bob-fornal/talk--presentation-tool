import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TalkComponent } from './talk.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../../_spec/mock-activated-route.spec';

import { CodeService } from '../../core/services/code.service';
import { MockCodeService } from '../../_spec/services/mock-code.service.spec';

import { BroadcastMessage } from '../../core/interfaces/broadcast';
import { Structure } from '../../core/interfaces/structure';

describe('TalkComponent', () => {
  let component: TalkComponent;
  let fixture: ComponentFixture<TalkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TalkComponent,
      ],
      imports: [
        MatButtonModule,
        MatIconModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: CodeService, useValue: MockCodeService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "handleKeyboardEvent @HostListener" to do nothing if control is true', () => {
    spyOn(component, 'next').and.stub();
    spyOn(component, 'previous').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      cancelable: true,
    });
    component.control = true;

    document.dispatchEvent(event);
    expect(component.next).not.toHaveBeenCalled();
    expect(component.previous).not.toHaveBeenCalled();
  });

  it('expects "handleKeyboardEvent @HostListener" to trigger next on ArrowRight', () => {
    spyOn(component, 'next').and.stub();
    spyOn(component, 'previous').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      cancelable: true,
    });
    component.control = false;

    document.dispatchEvent(event);
    expect(component.next).toHaveBeenCalled();
    expect(component.previous).not.toHaveBeenCalled();
  });

  it('expects "handleKeyboardEvent @HostListener" to trigger next on ArrowUp', () => {
    spyOn(component, 'next').and.stub();
    spyOn(component, 'previous').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', {
      key: 'ArrowUp',
      cancelable: true,
    });
    component.control = false;

    document.dispatchEvent(event);
    expect(component.next).toHaveBeenCalled();
    expect(component.previous).not.toHaveBeenCalled();
  });

  it('expects "handleKeyboardEvent @HostListener" to trigger previous on ArrowLeft', () => {
    spyOn(component, 'next').and.stub();
    spyOn(component, 'previous').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      cancelable: true,
    });
    component.control = false;

    document.dispatchEvent(event);
    expect(component.next).not.toHaveBeenCalled();
    expect(component.previous).toHaveBeenCalled();
  });

  it('expects "handleKeyboardEvent @HostListener" to trigger previous on ArrowDown', () => {
    spyOn(component, 'next').and.stub();
    spyOn(component, 'previous').and.stub();
    const event: KeyboardEvent = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      cancelable: true,
    });
    component.control = false;

    document.dispatchEvent(event);
    expect(component.next).not.toHaveBeenCalled();
    expect(component.previous).toHaveBeenCalled();
  });

  it('expects "init" to set path and get structure', () => {
    spyOn(component['code'], 'getStructure').and.stub();

    component.init();
    expect(component.path).toEqual('FOLDER');
    expect(component['code'].getStructure).toHaveBeenCalledWith('FOLDER');
  });

  it('expects "handleFontSize" to set the selected font size', () => {
    const font: string = 'XXL';
    component.fontsizeSelected = '';

    component.handleFontsizeChange(font);
    expect(component.fontsizeSelected).toEqual(font);
  });

  it('expects "handleStructure" to set structure and page route', () => {
    spyOn(component, 'setPageByRoute').and.stub();
    const structure: Structure = { ORDER: [], STYLE: [], test: 'TEST' };

    component.handleStructure(structure);
    expect(component.structure).toEqual(structure);
    expect(component.setPageByRoute).toHaveBeenCalledWith(structure);
  });

  it('expects "handleControlMessage" to set index and page for "navigate" type', () => {
    const message: BroadcastMessage = { type: '', payload: { type: 'navigate', index: 200, to: 'TO' } };
    const structure: Structure = { ORDER: [], STYLE: [], test: 'TEST' };
    component.structure = structure;
    component.slideIndex = -1;
    spyOn(component, 'setPage');
    spyOn(component['cdr'], 'detectChanges').and.stub();

    component.handleControlMessage(message);
    expect(component.slideIndex).toEqual(200);
    expect(component.setPage).toHaveBeenCalledWith('TO', structure);
  });

  it('expects "handleControlMessage" to send external and page for codeEditor type', () => {
    const message: BroadcastMessage = { type: '', payload: { type: 'toggle-console' } };
    spyOn(component.sendExternal, 'next');
    spyOn(component['cdr'], 'detectChanges').and.stub();

    component.handleControlMessage(message);
    expect(component.sendExternal.next).toHaveBeenCalledWith(message.payload);
  });

  it('expects "handleControlMessage" to trigger font size change', () => {
    const message: BroadcastMessage = { type: '', payload: { type: 'trigger-fontsize', fontsize: 'XL' } };
    spyOn(component['fonts'], 'change');
    spyOn(component['cdr'], 'detectChanges').and.stub();

    component.handleControlMessage(message);
    expect(component['fonts'].change).toHaveBeenCalledWith('XL');
  });

  it('expects "handleControlMessage" to close control', () => {
    const message: BroadcastMessage = { type: '', payload: { type: 'close' } };
    component.control = true;
    spyOn(component['cdr'], 'detectChanges').and.stub();

    component.handleControlMessage(message);
    expect(component.control).toEqual(false);
  });

  it('expects "getTalkStyle" to get a string', () => {
    component.structure = { ORDER: [], STYLE: ['style1', 'style2'] };
    const expected: string = 'style1 style2';

    const result: string = component.getTalkStyle();
    expect(result).toEqual(expected);
  });

  it('expects "setPageByRoute" to do nothing if path is empty', () => {
    const structure: Structure = { ORDER: [], STYLE: [] };
    component.path = '';
    spyOn(component, 'setPage').and.stub();

    component.setPageByRoute(structure);
    expect(component.setPage).not.toHaveBeenCalled();
  });

  it('expects "setPageByRoute" to do nothing if ORDER is empty', () => {
    const structure: Structure = { ORDER: [], STYLE: [] };
    spyOn(component, 'setPage').and.stub();

    component.setPageByRoute(structure);
    expect(component.setPage).not.toHaveBeenCalled();
  });

  it('expects "setPageByRoute" to call setPage', () => {
    const structure: Structure = { ORDER: ['one'], STYLE: [] };
    spyOn(component, 'setPage').and.stub();

    component.setPageByRoute(structure);
    expect(component.setPage).toHaveBeenCalledWith('SLIDE-KEY', structure);
  });

  it('expects "setPage" to do nothing if ORDER is empty', () => {
    const structure: Structure = { ORDER: [], STYLE: [] };
    spyOn(component['style'], 'add').and.stub();
    spyOn(component['zone'], 'run').and.stub();

    component.setPage('key', structure);
    expect(component['style'].add).not.toHaveBeenCalled();
    expect(component['zone'].run).not.toHaveBeenCalled();
  });

  it('expects "setPage" to set page data based on the key', () => {
    const key: string = 'KEY';
    const structure: Structure = {
      ORDER: [key],
      STYLE: ['style1', 'style2'],
      KEY: {
        title: 'TITLE',
        type: 'TYPE',
      }
    };
    spyOn(component['style'], 'add').and.stub();
    spyOn(component['zone'], 'run').and.stub();

    component.setPage(key, structure);
    expect(component.slideIndex).toEqual(0);
    expect(component.title).toEqual('TITLE');
    expect(component.type).toEqual('TYPE');
    expect(component.page).toEqual((structure as any)[key]);
    expect(component.slideKey).toEqual(key);
    expect(component['style'].add).toHaveBeenCalledWith('style1\nstyle2');
    expect(component['zone'].run).toHaveBeenCalledWith(jasmine.any(Function));
  });

  it('expects "zoneRun" to navigate to talk, path, key', () => {
    const key: string = 'KEY';
    component.path = 'PATH';
    spyOn(component['router'], 'navigate').and.stub();

    component.zoneRun(key);
    expect(component['router'].navigate).toHaveBeenCalledWith(['talk', 'PATH', 'KEY']);
  });

  it('expects "home" to set the page to index 0', () => {
    const structure: Structure = { ORDER: ['KEY'], STYLE: [] };
    component.structure = structure;
    spyOn(component, 'setPage').and.stub();

    component.home();
    expect(component.slideIndex).toEqual(0);
    expect(component.setPage).toHaveBeenCalledWith('KEY', structure);
  });

  it('expects "next" to do nothing if there is no next slide', () => {
    const structure: Structure = { ORDER: ['KEY'], STYLE: [] };
    component.structure = structure;
    component.slideIndex = 0;
    spyOn(component, 'setPage').and.stub();

    component.next();
    expect(component.slideIndex).toEqual(0);
    expect(component.setPage).not.toHaveBeenCalled();
  });

  it('expects "next" to shift to the next page', () => {
    const structure: Structure = { ORDER: ['KEY1', 'KEY2'], STYLE: [] };
    component.structure = structure;
    component.slideIndex = 0;
    spyOn(component, 'setPage').and.stub();

    component.next();
    expect(component.slideIndex).toEqual(1);
    expect(component.setPage).toHaveBeenCalledWith('KEY2', structure);
  });

  it('expects "previous" to do nothing if there is no previous slide', () => {
    const structure: Structure = { ORDER: ['KEY'], STYLE: [] };
    component.structure = structure;
    component.slideIndex = 0;
    spyOn(component, 'setPage').and.stub();

    component.previous();
    expect(component.slideIndex).toEqual(0);
    expect(component.setPage).not.toHaveBeenCalled();
  });

  it('expects "previous" to shift to the previous page', () => {
    const structure: Structure = { ORDER: ['KEY1', 'KEY2'], STYLE: [] };
    component.structure = structure;
    component.slideIndex = 1;
    spyOn(component, 'setPage').and.stub();

    component.previous();
    expect(component.slideIndex).toEqual(0);
    expect(component.setPage).toHaveBeenCalledWith('KEY1', structure);
  });

  it('expects "end" to shift to the last slide', () => {
    const structure: Structure = { ORDER: ['KEY1', 'KEY2', 'KEY3', 'KEY4'], STYLE: [] };
    component.structure = structure;
    component.slideIndex = 1;
    spyOn(component, 'setPage').and.stub();

    component.end();
    expect(component.slideIndex).toEqual(3);
    expect(component.setPage).toHaveBeenCalledWith('KEY4', structure);
  });

  it('expects "openControlPanel" to open a new tab with the correct URL', () => {
    component.path = 'PATH';
    component.slideKey = 'KEY';
    spyOn(component['router'], 'createUrlTree').and.callThrough();
    spyOn(component.window, 'open').and.stub();
    spyOn(component['cdr'], 'detectChanges').and.stub();

    component.openControlPanel();
    expect(component['router'].createUrlTree).toHaveBeenCalledWith(['control-panel', 'PATH', 'KEY']);
    expect(component.window.open).toHaveBeenCalledWith('/control-panel/PATH/KEY', '_blank');
    expect(component['cdr'].detectChanges).toHaveBeenCalled();
  });
});
