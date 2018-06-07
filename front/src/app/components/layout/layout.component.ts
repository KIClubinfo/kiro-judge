import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  currentUser: IUser;

  sideNavOpened = true;

  constructor(
    private readonly route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.currentUser = this.route.snapshot.data.currentUser;
  }

  logout() {
    this.authService.logout();
  }

  toggleSidenav() {
    this.sideNavOpened = !this.sideNavOpened;
  }

  get competitionId() {
    return this.currentUser.teams[0].competition;
  }

  get teamId() {
    return this.currentUser.teams[0].id;
  }
}
