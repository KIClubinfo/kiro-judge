import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  competitionId: number;
  teamId: number;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.competitionId = this.authService.getCurrentCompetitionId();
    this.teamId = this.authService.getCurrentTeamId();
  }

  logout() {
    this.authService.logout();
  }
}
