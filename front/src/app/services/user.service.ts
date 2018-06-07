import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IUser } from '../interfaces/user.interface';


@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<string> {
    return this.http.post<any>('/login', {
      username,
      password,
    }).pipe(
      map((body) => body.token)
    );
  }

  getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>('/users/me');
  }
}
