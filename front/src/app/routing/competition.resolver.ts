import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ICompetition } from '../interfaces/competition.interface';

@Injectable()
export class CompetitionResolver implements Resolve<ICompetition> {
  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ICompetition> {
    const competitionId = +route.paramMap.get('id');
    return of({
      id: 1,
      createdAt: null,
      updatedAt: null,
      name: 'KIRO 2018',
      description: 'Super concours',
      instances: [
        {
          id: 1,
          createdAt: null,
          updatedAt: null,
          name: 'Instance 1',
          description: 'Détails de l\'instance 1',
        },
        {
          id: 2,
          createdAt: null,
          updatedAt: null,
          name: 'Instance 2',
          description: 'Détails de l\'instance 2',
        },
        {
          id: 3,
          createdAt: null,
          updatedAt: null,
          name: 'Instance 3',
          description: 'Détails de l\'instance 3',
        },
      ],
    });
  }
}
