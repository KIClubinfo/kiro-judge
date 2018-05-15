import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  templateUrl: './competition-leaderboard.component.html',
  styleUrls: ['./competition-leaderboard.component.css']
})
export class CompetitionLeaderboardComponent {
  displayedColumns = ['position', 'name', 'bestScore'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

export interface ITeamRanking {
  rank: number;
  name: string;
  bestScore: number;
}

const ELEMENT_DATA: ITeamRanking[] = [
  {rank: 1, name: 'Hydrogen', bestScore: 1.0079},
  {rank: 2, name: 'Helium', bestScore: 4.0026},
  {rank: 3, name: 'Lithium', bestScore: 6.941},
  {rank: 4, name: 'Beryllium', bestScore: 9.0122},
  {rank: 5, name: 'Boron', bestScore: 10.811},
  {rank: 6, name: 'Carbon', bestScore: 12.0107},
  {rank: 7, name: 'Nitrogen', bestScore: 14.0067},
  {rank: 8, name: 'Oxygen', bestScore: 15.9994},
  {rank: 9, name: 'Fluorine', bestScore: 18.9984},
  {rank: 10, name: 'Neon', bestScore: 20.1797},
  {rank: 11, name: 'Sodium', bestScore: 22.9897},
  {rank: 12, name: 'Magnesium', bestScore: 24.305},
  {rank: 13, name: 'Aluminum', bestScore: 26.9815},
  {rank: 14, name: 'Silicon', bestScore: 28.0855},
  {rank: 15, name: 'Phosphorus', bestScore: 30.9738},
  {rank: 16, name: 'Sulfur', bestScore: 32.065},
  {rank: 17, name: 'Chlorine', bestScore: 35.453},
  {rank: 18, name: 'Argon', bestScore: 39.948},
  {rank: 19, name: 'Potassium', bestScore: 39.0983},
  {rank: 20, name: 'Calcium', bestScore: 40.078},
];
