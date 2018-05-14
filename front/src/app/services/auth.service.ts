import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user.interface';

export interface IJWT {
  accessToken: string;
  expiresAt: number;
}

const STORAGE_KEY = 'judge_jwt';

@Injectable()
export class AuthService {
  // Store authentication data
  currentUser: IUser;
  jwt: IJWT;
  authenticated: boolean;

  constructor(private router: Router) {
    const jwt = JSON.parse(localStorage.getItem(STORAGE_KEY));
    // Check session to restore login if not expired
    if (jwt && Date.now() < jwt.expiresAt) {
      this.authenticated = true;
      this.jwt = jwt;
    }
  }

  login(username, password) {
    this._setSession({
      accessToken: 'TOTO',
      expiresAt: Date.now() + 1000 * 1000,
    }, null);
    this.router.navigate(['/']);
  }

  private _setSession(jwtToken: IJWT, profile: IUser) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jwtToken));
    this.authenticated = true;
    this.jwt = jwtToken;
    this.currentUser = profile;
  }

  logout() {
    // Remove auth data and update login status
    localStorage.removeItem(STORAGE_KEY);
    this.authenticated = false;
    this.jwt = undefined;
    this.currentUser = undefined;
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return this.authenticated && Date.now() < this.jwt.expiresAt;
  }
}
