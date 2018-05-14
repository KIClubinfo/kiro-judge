import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RoutingModule } from './routing/routing.module';
import {
  CompetitionDetailsComponent,
  UploadInstanceSolutionDialogComponent,
} from './components/competition-details/competition-details.component';
import { CompetitionLeaderboardComponent } from './components/competition-leaderboard/competition-leaderboard.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    CompetitionDetailsComponent,
    UploadInstanceSolutionDialogComponent,
    CompetitionLeaderboardComponent,
    TeamDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    RoutingModule,
  ],
  entryComponents: [
    UploadInstanceSolutionDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
