import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ICompetition } from '../interfaces/competition.interface';
import { CompetitionService } from '../services/competition.service';


@Injectable()
export class CompetitionResolver implements Resolve<ICompetition> {
  constructor(
    private competitionService: CompetitionService,
  ) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ICompetition> {
    const competitionId = +route.paramMap.get('id');
    return this.competitionService.getCompetition(competitionId);
  }
}
