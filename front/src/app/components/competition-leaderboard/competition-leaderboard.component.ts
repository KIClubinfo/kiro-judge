import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ITeamRanking } from '../../interfaces/team-ranking.interface';
import { ICompetition } from '../../interfaces/competition.interface';

@Component({
  templateUrl: './competition-leaderboard.component.html',
  styleUrls: ['./competition-leaderboard.component.css']
})
export class CompetitionLeaderboardComponent implements OnInit {
  displayedColumns = ['position', 'name', 'bestScore'];
  dataSource: MatTableDataSource<ITeamRanking>;

  competition: ICompetition;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.competition = this.route.snapshot.data.competition;
    this.dataSource = new MatTableDataSource(this.route.snapshot.data.leaderboard);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  get isFrozen() {
    const now = new Date();
    return new Date(this.competition.freezeDate) <= now && now < new Date(this.competition.endDate);
  }
}
