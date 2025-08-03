import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { ApplicationRef } from '@angular/core';

// Function to initialize the app that can be imported by other applications
export function initializeApp(): Promise<ApplicationRef> {
  return bootstrapApplication(App, appConfig);
}

// Bootstrap the app if this file is executed directly
if (document.readyState === 'complete') {
  initializeApp().catch((err) => console.error(err));
} else {
  document.addEventListener('DOMContentLoaded', () => {
    initializeApp().catch((err) => console.error(err));
  });
}
