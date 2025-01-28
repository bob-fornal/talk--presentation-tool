import { Component } from '@angular/core';

import { CodeService } from './core/services/code.service';
import { LoggingService } from './core/services/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent {
  structure: any = {
    ORDER: []
  };

  constructor(
    private code: CodeService,
    private logging: LoggingService,
  ) {
    this.init();
  }

  init = async (): Promise<void> => {
    await this.code.init();
    this.logging.initLogging();
  };
}
