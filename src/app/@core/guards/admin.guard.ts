import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router,
              private  userService: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean |
    UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const jwtDecode = this.userService.getDecodedAccessToken();

    let role = jwtDecode.auth.split(',')
    if (localStorage.getItem('auth-token')
      && (role.includes('ROLE_ADMIN') || role.includes('ROLE_DM')
        || role.includes('ROLE_HR'))) {

      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/home/'], { queryParams: { returnUrl: state.url } });
    return true;
  }

}
