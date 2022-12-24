import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthenticationService } from '../user-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthenticated: boolean = false;
  constructor(private router: Router,private userAuthenticationService: UserAuthenticationService){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // let isLoggedIn = this.userAuthService.isAuthenticated();
      this.userAuthenticationService.isUserAuthenticated.subscribe((data) => {
        this.isAuthenticated = data;
      })
      if (this.isAuthenticated){
        return true
      } else {
        this.router.navigate(['/contact']);
      }
      return false;
  }
  
}
