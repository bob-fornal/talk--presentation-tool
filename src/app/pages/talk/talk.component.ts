import { Component, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Structure, StructureType } from 'src/app/core/interfaces/structure';
import { CodeService } from 'src/app/core/services/code.service';
import { StyleService } from 'src/app/core/services/style.service';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss'],
})
export class TalkComponent implements OnDestroy {
  subscription: Subscription;

  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if (['ArrowRight', 'ArrowUp'].includes(event.key)) {
        this.next();
      } else if (['ArrowLeft', 'ArrowDown'].includes(event.key)) {
        this.previous();
      }
    }

  structure: Structure = { ORDER: [], STYLE: [] };

  slideIndex: number = 0;

  path: string = '';
  page: StructureType = { title: '', type: '' };
  title: string = '';
  type: string = '';
  editing: boolean = false;

  constructor(
    private code: CodeService,
    private route: ActivatedRoute,
    private router: Router,
    private style: StyleService
  ) {
    this.subscription = this.code.structure.subscribe(this.handleStructure.bind(this));
    this.init();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  init = (): void => {
    const path: string = this.route.snapshot.paramMap.get('folder') || '';
    this.path = path;
    this.code.getStructure(path);
  };

  handleStructure = (structure: Structure): void => {
    this.structure = structure;
    this.setPageByRoute(structure);
  };

  getTalkStyle = (): string => this.structure.STYLE.join(' ');

  setPageByRoute = (structure: Structure): void => {
    if (this.path === '') return;
    const routeData: any = this.route.snapshot.data;
    const page = this.route.snapshot.paramMap.get('slideKey') || '';
    switch (true) {
      case routeData.type === 'edit-slide':
        this.editing = true;
        break;
      case routeData.type === 'talk-slide':
        this.editing = false;
        break;
    }
    this.setPage(page, structure);
  };

  setPage = (key: string, structure: Structure): void => {
    if (structure.ORDER.length === 0) return;
    this.slideIndex = structure.ORDER.indexOf(key);

    const page: StructureType = (this.structure[key] as StructureType);
    this.title = page.title;
    this.type = page.type;
    this.page = page;

    const style = structure.STYLE;
    this.style.add(style.join('\n'));

    const base: string = this.editing === false ? 'talk' : 'edit';
    this.router.navigate([base, this.path, structure.ORDER[this.slideIndex]]);
  };

  home = (): void => {
    this.slideIndex = 0;
    const page: string = this.structure.ORDER[this.slideIndex];
    this.setPage(page, this.structure);
  };

  next = (): void => {
    if ((this.slideIndex + 1) >= this.structure.ORDER.length) return;

    this.slideIndex++;
    const page: string = this.structure.ORDER[this.slideIndex];
    this.setPage(page, this.structure);
  };

  previous = (): void => {
    if (this.slideIndex === 0) return;
    
    this.slideIndex--;
    const page: string = this.structure.ORDER[this.slideIndex];
    this.setPage(page, this.structure);
  };

  end = (): void => {
    this.slideIndex = this.structure.ORDER.length - 1;
    const page: string = this.structure.ORDER[this.slideIndex];
    this.setPage(page, this.structure);
  };

  handleDataSave = (event: any): void => {
    console.log(event);
  };
}
