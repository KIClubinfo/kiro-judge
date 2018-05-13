import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ITeam } from '../../interfaces/team.interface';

@Injectable()
export class TeamResolver implements Resolve<ITeam> {
  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ITeam> {
    const teamId = +route.paramMap.get('id');
    return of();
  }
}
