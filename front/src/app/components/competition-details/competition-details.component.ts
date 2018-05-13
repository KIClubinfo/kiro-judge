import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICompetition } from '../../interfaces/competition.interface';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css']
})
export class CompetitionDetailsComponent implements OnInit {
  competition: ICompetition;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.competition = this.route.snapshot.data.competition;
  }

}
