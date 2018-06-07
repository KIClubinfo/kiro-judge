import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITeam } from '../../interfaces/team.interface';
import { ISubmission } from '../../interfaces/submission.interface';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  team: ITeam;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.team = this.route.snapshot.data.team;
  }

  hasError(submission: ISubmission) {
    return submission.error !== null && submission.error !== '';
  }
}
