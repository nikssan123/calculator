import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authHeadersInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
  const jwtToken = localStorage.getItem('token');

  if (jwtToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    });
  }

  return next(req);
};