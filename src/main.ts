import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Prevent the browser from restoring scroll position on refresh
if (typeof history !== 'undefined') {
  history.scrollRestoration = 'manual';
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
