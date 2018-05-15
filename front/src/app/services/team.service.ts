import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITeam } from '../interfaces/team.interface';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeam(id: number): Observable<ITeam> {
    return this.http.get<ITeam>(`/teams/${id}`);
  }
}
