import { Component, Input } from '@angular/core';
import { CodeService } from 'src/app/core/services/code.service';

@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent {
  @Input() title: string = '';
  @Input() path: string = '';
  @Input() folder: string = '';
  @Input() files: Array<string> = [];

  selected: string = '';

  constructor(
    private codeService: CodeService
  ) {
    this.init();
  }

  init = () => {
    setTimeout(() => {
      this.fileSelection(this.files[0]);
    }, 100);
  };

  editorOptions = {
    theme: 'vs-dark',
    language: 'typescript',
    fontSize: 18,
    height: '900px',
    
    hover: {
      enabled: false,
    },
    minimap: {
      enabled: false,
    },
  };
  code: string = 'function x() {\n  console.log("Hello world");\n}';

  fileSelection = async (file: string): Promise<void> => {
    this.selected = file;
    const fileAndPath: string = `assets/${ this.path }/${ this.folder }/${ file }`;
    const code: string = await this.codeService.getCode(fileAndPath);
    this.code = code;
  };
}
