import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CompetitionService } from '../services/competition.service';
import { ITeamRanking } from '../interfaces/team-ranking.interface';


@Injectable()
export class CompetitionLeaderboardResolver implements Resolve<ITeamRanking[]> {
  constructor(
    private competitionService: CompetitionService,
  ) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ITeamRanking[]> {
    const competitionId = +route.paramMap.get('id');
    return this.competitionService.getCompetitionLeaderboard(competitionId);
  }
}
