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

  it('expects "control @HostListener" to do nothing if control is true', () => {
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

  it('expects "control @HostListener" to trigger next on ArrowRight', () => {
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

  it('expects "control @HostListener" to trigger next on ArrowUp', () => {
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

  it('expects "control @HostListener" to trigger previous on ArrowLeft', () => {
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

  it('expects "control @HostListener" to trigger previous on ArrowDown', () => {
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
});
