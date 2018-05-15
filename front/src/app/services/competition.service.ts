import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompetition } from '../interfaces/competition.interface';
import { ITeamRanking } from '../../../../back/src/judge/interfaces/team-ranking.interface';

@Injectable({ providedIn: 'root' })
export class CompetitionService {

  constructor(private http: HttpClient) { }

  getCompetition(id: number): Observable<ICompetition> {
    return this.http.get<ICompetition>(`/competitions/${id}`);
  }

  getCompetitionLeaderboard(id: number): Observable<ITeamRanking[]> {
    return this.http.get<ITeamRanking[]>(`/competitions/${id}/leaderboard`);
  }
}
