import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user.interface';
import { IJWTPayload } from '../../../../back/src/auth/interfaces/jwt-payload.interface';

const STORAGE_KEY = 'judge_jwt';

@Injectable()
export class AuthService {
  private currentUser: IUser;
  private jwtPayload: IJWTPayload;
  private authenticated: boolean;

  constructor(private router: Router) {
    const jwt: IJWTPayload = JSON.parse(localStorage.getItem(STORAGE_KEY));
    // Check session to restore login if not expired
    if (jwt && Date.now() < jwt.exp) {
      this.authenticated = true;
      this.jwtPayload = jwt;
    }
  }

  login(jwtPayload: IJWTPayload, userProfile?: IUser) {
    this._setSession(jwtPayload, userProfile);
    this.router.navigate(['/']);
  }

  private _setSession(jwtPayload: IJWTPayload, profile: IUser) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jwtPayload));
    this.authenticated = true;
    this.jwtPayload = jwtPayload;
    this.currentUser = profile;
  }

  logout() {
    // Remove auth data and update login status
    localStorage.removeItem(STORAGE_KEY);
    this.authenticated = false;
    this.jwtPayload = undefined;
    this.currentUser = undefined;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authenticated && Date.now() < this.jwtPayload.exp;
  }

  getCurrentUser(): IUser {
    return this.currentUser;
  }

  getCurrentCompetitionId(): number {
    return this.jwtPayload.competitionId;
  }

  getCurrentTeamId(): number {
    return this.jwtPayload.competitionId;
  }
}
