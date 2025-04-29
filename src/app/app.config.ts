import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

/**
 * Application configuration object for the Angular app.
 * Provides essential services and configurations for the application.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    
    // Provides the router configuration for the application.
    provideRouter(routes),
    
    // Provides asynchronous animations support for the application.
    provideAnimationsAsync()
    
  ]
};
