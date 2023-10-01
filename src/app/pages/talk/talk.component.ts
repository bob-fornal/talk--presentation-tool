import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Structure, StructureType } from 'src/app/core/interfaces/structure';
import { CodeService } from 'src/app/core/services/code.service';
import { StyleService } from 'src/app/core/services/style.service';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.scss'],
})
export class TalkComponent {
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

  title: string = '';
  type: string = '';

  constructor(
    private code: CodeService,
    private route: ActivatedRoute,
    private style: StyleService
  ) {
    this.code.structure.subscribe(this.handleStructure.bind(this));
    this.init();
  }

  init = (): void => {
    const path: string = this.route.snapshot.paramMap.get('folder') || '';
    this.code.getStructure(path);
  };

  handleStructure = (structure: Structure): void => {
    this.structure = structure;
    this.setPage(this.slideIndex, structure);
  };

  getTalkStyle = (): string => this.structure.STYLE.join(' ');

  setPage = (index: number, structure: Structure): void => {
    if (structure.ORDER.length === 0) return;
    const key: string = structure.ORDER[index];

    const page: StructureType = (this.structure[key] as StructureType);
    this.title = page.title;
    this.type = page.type;

    const style = structure.STYLE;
    this.style.add(style.join('\n'));
  };

  next = (): void => {
    if (this.slideIndex >= this.structure.ORDER.length) return;
    
    this.slideIndex++;
    this.setPage(this.slideIndex, this.structure);
  };

  previous = (): void => {
    if (this.slideIndex === 0) return;
    
    this.slideIndex--;
    this.setPage(this.slideIndex, this.structure);
  };
}
