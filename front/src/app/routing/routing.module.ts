import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';
import { HomeComponent } from '../components/home/home.component';
import { TeamDetailsComponent } from '../components/team-details/team-details.component';
import { CompetitionDetailsComponent } from '../components/competition-details/competition-details.component';
import { CompetitionResolver } from './competition.resolver';
import { TeamResolver } from './team.resolver';
import { CompetitionLeaderboardComponent } from '../components/competition-leaderboard/competition-leaderboard.component';
import { AuthGuard } from '../services/auth.guard';
import { LoginComponent } from '../components/login/login.component';
import { CompetitionLeaderboardResolver } from './competition-leaderboard.resolver';
import { CurrentUserResolver } from './current-user.resolver';


const routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [
      AuthGuard,
    ],
    resolve: {
      currentUser: CurrentUserResolver,
    },
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'competitions',
        children: [
          {
            path: ':id',
            resolve: {
              competition: CompetitionResolver,
            },
            children: [
              {
                path: '',
                component: CompetitionDetailsComponent,
              },
              {
                path: 'leaderboard',
                component: CompetitionLeaderboardComponent,
                resolve: {
                  leaderboard: CompetitionLeaderboardResolver,
                }
              },
            ]
          },
        ],
      },
      {
        path: 'teams',
        children: [
          {
            path: ':id',
            component: TeamDetailsComponent,
            resolve: {
              team: TeamResolver,
            }
          },
        ],
      },
    ],
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [ RouterModule ],
  providers: [
    CurrentUserResolver,
    CompetitionResolver,
    CompetitionLeaderboardResolver,
    TeamResolver,
  ],
})
export class RoutingModule {}
