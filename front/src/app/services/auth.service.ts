import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user.interface';
import { IJWTPayload } from '../../../../back/src/auth/interfaces/jwt-payload.interface';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const STORAGE_KEY = 'judge_jwt';

@Injectable()
export class AuthService {
  private currentUser: IUser;
  private accessToken: string;
  private jwtPayload: IJWTPayload = null;

  private jwtHelper = new JwtHelperService();

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
    const savedToken = localStorage.getItem(STORAGE_KEY);

    this.loadToken(savedToken);
  }

  login(email: string, password: string): Observable<string> {
    return this.userService.login(email, password).pipe(
      tap(jwtToken => this.loadToken(jwtToken)),
    );
  }

  logout() {
    this.cleanStorage();
    this.router.navigate(['/login']);
  }

  private loadToken(encodedToken: string): IJWTPayload {
    if (encodedToken == null) {
      return;
    }

    let decodedToken;
    try {
      decodedToken = this.jwtHelper.decodeToken(encodedToken);
    } catch (e) {
      this.cleanStorage();
      return;
    }

    localStorage.setItem(STORAGE_KEY, encodedToken);
    this.accessToken = encodedToken;
    this.jwtPayload = decodedToken;

    return this.jwtPayload;
  }

  private cleanStorage(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.accessToken = null;
    this.jwtPayload = null;
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.jwtPayload !== null && Date.now() < this.jwtPayload.exp * 1000;
  }

  getAccessToken(): string {
    return this.accessToken;
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
