import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user.interface';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const STORAGE_KEY = 'master_imi_token';

@Injectable()
export class AuthService {
  private currentUser: IUser;
  private accessToken: string;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
    const savedToken = localStorage.getItem(STORAGE_KEY);

    this.loadToken(savedToken);
  }

  login(username: string, password: string): Observable<string> {
    return this.userService.login(username, password).pipe(
      tap(accessToken => this.loadToken(accessToken)),
    );
  }

  logout() {
    this.cleanStorage();
    this.router.navigate(['/login']);
  }

  private loadToken(accessToken: string): void {
    if (accessToken == null) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, accessToken);
    this.accessToken = accessToken;
  }

  private cleanStorage(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.accessToken = null;
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.accessToken != null;
  }

  getAccessToken(): string {
    return this.accessToken;
  }
}
