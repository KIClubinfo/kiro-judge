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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { CompetitionService } from './services/competition.service';
import { TeamService } from './services/team.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { UserService } from './services/user.service';
import { SubmissionService } from './services/submission.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    CompetitionDetailsComponent,
    UploadInstanceSolutionDialogComponent,
    CompetitionLeaderboardComponent,
    TeamDetailsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    FlexLayoutModule,
    RoutingModule,
    HttpClientModule,
  ],
  entryComponents: [
    UploadInstanceSolutionDialogComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
    AuthGuard,
    CompetitionService,
    TeamService,
    UserService,
    SubmissionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
