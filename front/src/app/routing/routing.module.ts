import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';
import { HomeComponent } from '../components/home/home.component';
import { TeamDetailsComponent } from '../components/team-details/team-details.component';
import { CompetitionDetailsComponent } from '../components/competition-details/competition-details.component';
import { CompetitionResolver } from './competition.resolver';
import { TeamResolver } from '../components/team-details/team.resolver';
import { CompetitionScoreboardComponent } from '../components/competition-scoreboard/competition-scoreboard.component';


const routes = [
  {
    path: '',
    component: LayoutComponent,
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
                path: 'scoreboard',
                component: CompetitionScoreboardComponent,
              },
            ]
          },
        ],
      },
      {
        path: 'teams',
        children: [
          // {
          //   path: 'me',
          //   component: TeamComponent,
          //   resolve: {
          //     teams: MyTeamsResolver,
          //   }
          // },
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
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [
    CompetitionResolver,
    TeamResolver,
  ],
})
export class RoutingModule {}
