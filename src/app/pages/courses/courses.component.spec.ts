import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { CoursesComponent } from './courses.component';

import { CodeService } from '../../core/services/code.service';
import { MockCodeService } from '../../_spec/services/mock-code.service.spec';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { Tag } from '../../core/interfaces/tag';
import { Talk, Talks } from '../../core/interfaces/talks';
import { Structure } from '../../core/interfaces/structure';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
      ],
      declarations: [
        CoursesComponent
      ],
      providers: [
        { provide: CodeService, useValue: MockCodeService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "handlTalks to configure a new talk', () => {
    const wrapper: Talks = {
      TALKS: [
        { folder: 'folder1', title: 'title1', tags: [] },
        { folder: 'folder3', title: 'title3', tags: [] },
        { folder: 'folder2', title: 'title2', tags: [] },
      ],
      STYLE: ['style1', 'style2'],
      TAGS: [
        { tag: 'tag1', title: 'Tag 1' },
        { tag: 'tag2', title: 'Tag 2' },
      ],
    };
    const ordered: Array<Talk> = [
      { folder: 'folder1', title: 'title1', tags: [] },
      { folder: 'folder2', title: 'title2', tags: [] },
      { folder: 'folder3', title: 'title3', tags: [] },
    ];
    spyOn(component['style'], 'add').and.stub();
    spyOn(component, 'captureTalks').and.stub();

    component.handleTalks(wrapper);
    expect(component.talks).toEqual(ordered);
    expect(component.filteredTalks).toEqual(ordered);
    expect(component.tags).toEqual(wrapper.TAGS);
    expect(component['style'].add).toHaveBeenCalledWith('style1\nstyle2')
  });

  it('expects "handleTalksSort" to return -1 if a.title is lower', () => {
    const a: Talk = { folder: '', title: 'A', tags: [] };
    const b: Talk = { folder: '', title: 'B', tags: [] };

    const result: number = component.handleTalksSort(a, b);
    expect(result).toEqual(-1);
  });

  it('expects "handleTalksSort" to return -1 if a.title is higher', () => {
    const a: Talk = { folder: '', title: 'C', tags: [] };
    const b: Talk = { folder: '', title: 'B', tags: [] };

    const result: number = component.handleTalksSort(a, b);
    expect(result).toEqual(1);
  });

  it('expects "handleTalksSort" to return 0 if a.title is equal', () => {
    const a: Talk = { folder: '', title: 'B', tags: [] };
    const b: Talk = { folder: '', title: 'B', tags: [] };

    const result: number = component.handleTalksSort(a, b);
    expect(result).toEqual(0);
  });

  it('expects "filterTalks" to filter tags and talks', () => {
    const item: Tag = { tag: 'TAG', title: 'Tag' };
    spyOn(component, 'handleFilterTags').and.stub();
    spyOn(component, 'handleFilterTalks').and.stub();

    component.filterTalks(item);
    expect(component.handleFilterTags).toHaveBeenCalledWith(item);
    expect(component.handleFilterTalks).toHaveBeenCalled();
  });

  it('expects "handleFilterTags" to remove the tag from selected', () => {
    const item: Tag = { tag: 'TAG', title: 'Tag' };
    component.selectedTags = ['TAG'];

    component.handleFilterTags(item);
    expect(component.selectedTags).toEqual([]);
  });

  it('expects "handleFilterTags" to add the tag from selected', () => {
    const item: Tag = { tag: 'TAG', title: 'Tag' };
    component.selectedTags = [];

    component.handleFilterTags(item);
    expect(component.selectedTags).toEqual(['TAG']);
  });

  it('expects "handleFilterTalks" to filter talks (none)', () => {
    const talks: Array<Talk> = [
      { folder: 'FOLDER1', title: 'ONE', tags: ['ONE'] },
      { folder: 'FOLDER2', title: 'TWO', tags: ['TWO'] },
      { folder: 'FOLDER3', title: 'THREE', tags: ['THREE'] },
      { folder: 'FOLDER4', title: 'FOUR', tags: ['FOUR'] },
    ];
    const selectedTags: Array<string> = ['ONE', 'THREE'];
    component.talks = talks;
    component.selectedTags = selectedTags;
    const expected: Array<Talk> = [];

    component.handleFilterTalks();
    expect(component.filteredTalks).toEqual(expected);
  });

  it('expects "handleFilterTalks" to filter talks (some)', () => {
    const talks: Array<Talk> = [
      { folder: 'FOLDER1', title: 'ONE', tags: ['ONE', 'THREE'] },
      { folder: 'FOLDER2', title: 'TWO', tags: ['TWO'] },
      { folder: 'FOLDER3', title: 'THREE', tags: ['ONE', 'THREE'] },
      { folder: 'FOLDER4', title: 'FOUR', tags: ['FOUR'] },
    ];
    const selectedTags: Array<string> = ['ONE', 'THREE'];
    component.talks = talks;
    component.selectedTags = selectedTags;
    const expected: Array<Talk> = [
      { folder: 'FOLDER1', title: 'ONE', tags: ['ONE', 'THREE'] },
      { folder: 'FOLDER3', title: 'THREE', tags: ['ONE', 'THREE'] },
    ];

    component.handleFilterTalks();
    expect(component.filteredTalks).toEqual(expected);
  });

  it('expects "handleFilterTalks" to show (all) talks', () => {
    const talks: Array<Talk> = [
      { folder: 'FOLDER1', title: 'ONE', tags: ['ONE'] },
      { folder: 'FOLDER2', title: 'TWO', tags: ['TWO'] },
      { folder: 'FOLDER3', title: 'THREE', tags: ['THREE'] },
      { folder: 'FOLDER4', title: 'FOUR', tags: ['FOUR'] },
    ];
    const selectedTags: Array<string> = [];
    component.talks = talks;
    component.selectedTags = selectedTags;
    const expected: Array<Talk> = [
      { folder: 'FOLDER1', title: 'ONE', tags: ['ONE'] },
      { folder: 'FOLDER2', title: 'TWO', tags: ['TWO'] },
      { folder: 'FOLDER3', title: 'THREE', tags: ['THREE'] },
      { folder: 'FOLDER4', title: 'FOUR', tags: ['FOUR'] },
    ];

    component.handleFilterTalks();
    expect(component.filteredTalks).toEqual(expected);
  });

  it('expects "isTalkSelected" to return true if all tags are in selected', () => {
    const selectedTags: Array<string> = ['ONE', 'TWO', 'THREE'];
    component.selectedTags = selectedTags;
    const tags: Array<string> = ['ONE', 'TWO', 'THREE', 'FOUR'];

    const result: boolean = component.isTalkSelected(tags);
    expect(result).toEqual(true);
  });

  it('expects "isTalkSelected" to return false if all tags are not in selected', () => {
    const selectedTags: Array<string> = ['ONE', 'TWO', 'THREE', 'FIVE'];
    component.selectedTags = selectedTags;
    const tags: Array<string> = ['ONE', 'TWO', 'THREE', 'FOUR'];

    const result: boolean = component.isTalkSelected(tags);
    expect(result).toEqual(false);
  });

  it('expects "selectedTag" to return primary if item tag is in selected tags', () => {
    const selectedTags: Array<string> = ['ONE', 'TWO', 'THREE', 'FIVE'];
    component.selectedTags = selectedTags;
    const item: Tag = { tag: 'TWO', title: 'Two' };

    const result: string = component.selectedTag(item);
    expect(result).toEqual('primary');
  });

  it('expects "selectedTag" to return empty if item tag is not in selected tags', () => {
    const selectedTags: Array<string> = ['ONE', 'TWO', 'THREE', 'FIVE'];
    component.selectedTags = selectedTags;
    const item: Tag = { tag: 'FOUR', title: 'Four' };

    const result: string = component.selectedTag(item);
    expect(result).toEqual('');
  });

  it('expects "clickTalkEvent" to navigate to first order', async () => {
    const talk: Talk = { folder: 'FOLDER', title: 'TITLE', tags: [] };
    const structure: Structure = { ORDER: ['FIRST', 'SECOND', 'THIRD'], STYLE: [] };
    spyOn(component['code'], 'getStructureImmediate').and.resolveTo(structure);
    spyOn(component['router'], 'navigate').and.stub();
    component.selectedTemplateKey = 'SELECTED-TEMPLATE-KEY';

    await component.clickTalkEvent(talk);
    expect(component['router'].navigate).toHaveBeenCalledWith(['talk', 'FOLDER', 'SELECTED-TEMPLATE-KEY', 'FIRST']);
  });

  it('expects "captureTalks" to setup talk data and check PDF', async () => {
    const talks: Array<Talk> = [
      { folder: 'FOLDER', title: 'TITLE', tags: [] },
      { folder: 'FOLDER', title: 'TITLE', tags: [], pdf: 'PDF' },
    ];
    const structure: Structure = { ORDER: ['FIRST', 'SECOND', 'THIRD'], STYLE: [] };
    spyOn(component['code'], 'getStructureImmediate').and.resolveTo(structure);
    spyOn(component['code'], 'checkLink').and.resolveTo(true);

    await component.captureTalks(talks);
    expect(component['code'].getStructureImmediate).toHaveBeenCalledTimes(2);
    expect(component['code'].checkLink).toHaveBeenCalledTimes(1);
  });

  it('expects "isComplete" to return false if talk data is undefined', () => {
    const talk: Talk = { folder: 'FOLDER', title: 'TITLE', tags: [] };
    delete component.talkData['FOLDER'];

    const result: boolean = component.isComplete(talk);
    expect(result).toEqual(false);
  });

  it('expects "isComplete" to return true if number of slides equals number of notes', () => {
    const talk: Talk = { folder: 'FOLDER', title: 'TITLE', tags: [] };
    const structure: Structure = {
      ORDER: ['FIRST', 'SECOND', 'THIRD'],
      STYLE: [],
      FIRST: { title: '', type: '', notes: '' },
      SECOND: { title: '', type: '', notes: '' },
      THIRD: { title: '', type: '', notes: '' },
    };
    component.talkData['FOLDER'] = structure;

    const result: boolean = component.isComplete(talk);
    expect(result).toEqual(true);
  });

  it('expects "isComplete" to return false if number of slides does not equal the number of notes', () => {
    const talk: Talk = { folder: 'FOLDER', title: 'TITLE', tags: [] };
    const structure: Structure = {
      ORDER: ['FIRST', 'SECOND', 'THIRD'],
      STYLE: [],
      FIRST: { title: '', type: '' },
      SECOND: { title: '', type: '', notes: '' },
      THIRD: { title: '', type: '', notes: '' },
    };
    component.talkData['FOLDER'] = structure;

    const result: boolean = component.isComplete(talk);
    expect(result).toEqual(false);
  });

  it('expects "getStatus" to return empty string if talk data is undefined', () => {
    const talk: Talk = { folder: 'FOLDER', title: 'TITLE', tags: [] };
    delete component.talkData['FOLDER'];

    const result: string = component.getStatus(talk);
    expect(result).toEqual('');
  });

  it('expects "getStatus" to return COMPLETE if number of slides equals number of notes', () => {
    const talk: Talk = { folder: 'FOLDER', title: 'TITLE', tags: [] };
    const structure: Structure = {
      ORDER: ['FIRST', 'SECOND', 'THIRD'],
      STYLE: [],
      FIRST: { title: '', type: '', notes: '' },
      SECOND: { title: '', type: '', notes: '' },
      THIRD: { title: '', type: '', notes: '' },
    };
    component.talkData['FOLDER'] = structure;

    const result: string = component.getStatus(talk);
    expect(result).toEqual('COMPLETE: 3 Slides');
  });

  it('expects "getStatus" to return status if number of slides does not equal the number of notes', () => {
    const talk: Talk = { folder: 'FOLDER', title: 'TITLE', tags: [] };
    const structure: Structure = {
      ORDER: ['FIRST', 'SECOND', 'THIRD'],
      STYLE: [],
      FIRST: { title: '', type: '' },
      SECOND: { title: '', type: '', notes: '' },
      THIRD: { title: '', type: '', notes: '' },
    };
    component.talkData['FOLDER'] = structure;

    const result: string = component.getStatus(talk);
    expect(result).toEqual('Slides: 3, Notes: 2');
  });
});
