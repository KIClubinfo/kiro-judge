import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ITeamRanking } from '../../interfaces/team-ranking.interface';

@Component({
  templateUrl: './competition-leaderboard.component.html',
  styleUrls: ['./competition-leaderboard.component.css']
})
export class CompetitionLeaderboardComponent implements OnInit {
  displayedColumns = ['position', 'name', 'bestScore'];
  dataSource: MatTableDataSource<ITeamRanking>;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.route.snapshot.data.leaderboard);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
