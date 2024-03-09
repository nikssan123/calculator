import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authHeadersInterceptor } from './services/auth-headers.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),  importProvidersFrom(HttpClientModule), provideHttpClient(withInterceptors([
    authHeadersInterceptor
  ]))]
};
