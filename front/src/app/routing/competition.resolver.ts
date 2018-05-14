import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ICompetition } from '../interfaces/competition.interface';


export const mockInstance1 = {
  id: 1,
  createdAt: null,
  updatedAt: null,
  name: 'Instance 1',
  description: 'Détails de l\'instance 1',
  inputUrl: 'http://viewportsizes.com/devices.csv',
};
export const mockInstance2 = {
  id: 2,
  createdAt: null,
  updatedAt: null,
  name: 'Instance 2',
  description: 'Détails de l\'instance 2',
  inputUrl: 'http://viewportsizes.com/devices.csv',
};
export const mockInstance3 = {
  id: 3,
  createdAt: null,
  updatedAt: null,
  name: 'Instance 3',
  description: 'Détails de l\'instance 3',
  inputUrl: 'http://viewportsizes.com/devices.csv',
};
export const mockCompetition = {
  id: 1,
  createdAt: null,
  updatedAt: null,
  name: 'KIRO 2018',
  description: 'Super concours',
  subjectUrl: 'https://google.fr/favicon.ico',
  instances: [
    mockInstance1,
    mockInstance2,
    mockInstance3,
  ],
};

@Injectable()
export class CompetitionResolver implements Resolve<ICompetition> {
  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ICompetition> {
    const competitionId = +route.paramMap.get('id');
    return of(mockCompetition);
  }
}
