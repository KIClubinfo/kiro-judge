import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionScoreboardComponent } from './competition-scoreboard.component';

describe('ScoreboardComponent', () => {
  let component: CompetitionScoreboardComponent;
  let fixture: ComponentFixture<CompetitionScoreboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionScoreboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
