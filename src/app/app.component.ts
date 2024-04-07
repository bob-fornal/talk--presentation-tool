import { APP_INITIALIZER, Component, isDevMode } from '@angular/core';
import { CodeService } from './core/services/code.service';
import { RouterOutlet } from '@angular/router';

import { inject } from "@vercel/analytics"

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

  constructor(private code: CodeService) {
    this.init();
  }

  init = async (): Promise<void> => {
    await this.code.init();
  };
}
