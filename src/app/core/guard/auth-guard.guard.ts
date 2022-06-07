import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    public tokenStorage: TokenStorageService,
    public router: Router
  ) {}

  canActivate() {
    if (this.tokenStorage.isLoggedIn() !== true) {
      window.localStorage.removeItem('admin');
      window.localStorage.removeItem('token');
      this.router.navigate(['login']);
    }
    return true;
  }
}
