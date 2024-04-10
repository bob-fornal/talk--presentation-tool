import { APP_INITIALIZER, Component, isDevMode } from '@angular/core';
import { CodeService } from './core/services/code.service';
import { RouterOutlet } from '@angular/router';

import { inject } from "@vercel/analytics"
import { LoggingService } from './core/services/logging.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet],
    providers: [{
      provide: APP_INITIALIZER,
      useFactory: () => {
        inject({ mode: isDevMode() ? 'development' : 'production' });
      }
    }]
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
