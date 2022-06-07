import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAppStore from '../stores/app.reducer';
import { Router } from '@angular/router';

declare var $: any;

const TOKEN_HEADER_KEY = 'Authorization';
// export const InterceptorSkipHeader = 'Interceptor-Skip';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;

    const token = this.token.getToken();

    if (token != null) {
      if (req.headers.has('RemoveBearer')) {
        const headers = req.headers.delete('RemoveBearer');
        return next.handle(req.clone({ headers }));
      }

      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
      });
    } else {
      // console.log('no Token');
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
