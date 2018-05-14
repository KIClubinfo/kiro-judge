import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ITeam } from '../interfaces/team.interface';
import { mockCompetition, mockInstance1 } from './competition.resolver';

@Injectable()
export class TeamResolver implements Resolve<ITeam> {
  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ITeam> {
    const teamId = +route.paramMap.get('id');
    return of({
      id: 1,
      createdAt: null,
      updatedAt: null,
      name: 'Best TEAM',
      description: null,
      competition: mockCompetition,
      members: [
        {
          id: 1,
          createdAt: null,
          updatedAt: null,
          email: 'me@example.com',
          firstName: 'Example',
          lastName: 'LastName',
        },
      ],
      submissions: [
        {
          id: 1,
          createdAt: null,
          updatedAt: null,
          instance: mockInstance1,
          score: 7,
        },
        {
          id: 1,
          createdAt: null,
          updatedAt: null,
          instance: mockInstance1,
          score: null,
        },
      ],
    });
  }
}
