import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router,
    private authService: AuthService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.authService.userValue;
      if (user) {
          // check if route is restricted by role
          if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
            // role not authorised so redirect to home page
            this.router.navigate(['/']);
            return false;
          }
          // authorised so return true
          return true;
      }

      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false;
  }
}
