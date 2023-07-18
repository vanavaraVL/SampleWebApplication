import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {APP_CONFIG} from './injection-tokens';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

if (environment.production) {
  enableProdMode();
}

fetch('/assets/config.json').then((data) =>
  data.json().then((appConfig) => {
    platformBrowserDynamic([{provide: APP_CONFIG, useValue: appConfig}])
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  })
);
