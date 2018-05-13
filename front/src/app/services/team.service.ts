import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ITeam } from '../interfaces/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  getAll(): Observable<ITeam[]> {
    return of([]);
  }
}
