import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ITeam } from '../interfaces/team.interface';
import { TeamService } from '../services/team.service';


@Injectable()
export class TeamResolver implements Resolve<ITeam> {
  constructor(
    private teamService: TeamService,
  ) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ITeam> {
    const teamId = +route.paramMap.get('id');
    return this.teamService.getTeam(teamId);
  }
}
