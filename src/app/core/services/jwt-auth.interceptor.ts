import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'

import { HTTP_INTERCEPTORS } from '@angular/common/http'
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http'

import { TokenStorageService } from '../services/token-storage.service'

declare var $: any

const TOKEN_HEADER_KEY = 'Authorization'

@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let authReq = req
    const token = this.token.getToken()
    if (token != null) {
      console.log('We are ere')
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
      })
    } else {
      console.log('We are not here')
    }
    return next.handle(authReq)
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true },
]
