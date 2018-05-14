import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionLeaderboardComponent } from './competition-leaderboard.component';

describe('LeaderboardComponent', () => {
  let component: CompetitionLeaderboardComponent;
  let fixture: ComponentFixture<CompetitionLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionLeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
