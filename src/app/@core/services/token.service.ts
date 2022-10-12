import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {UserService} from "./user.service";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    private cookie: CookieService,
    private userService: UserService,
  ) {
  }

  getToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token;
  }

  public saveToken(token: string): void {
   localStorage.removeItem(TOKEN_KEY);
   localStorage.setItem(TOKEN_KEY, token);
  }

  removeToken() {
    this.cookie.delete(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    const data = this.userService.getDecodedAccessToken();
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}

