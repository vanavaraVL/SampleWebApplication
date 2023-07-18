import {InjectionToken} from '@angular/core';
import { IAppConfig} from './app/types/AppConfig';

export const APP_CONFIG = new InjectionToken<IAppConfig>('app.config');
