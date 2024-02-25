import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    if (token) {
      request = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`) });
    }
    return next.handle(request);
  }
}

export const tokenInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
];
