import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICompetition } from '../../interfaces/competition.interface';
import { IInstance } from '../../interfaces/instance.interface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

function forceDownload(href) {
  const filename = href.substring(href.lastIndexOf('/') + 1);

  const anchorElement = document.createElement('a');
  anchorElement.setAttribute('href', href);
  anchorElement.setAttribute('download', filename);
  anchorElement.setAttribute('target', '_blank');
  anchorElement.style.display = 'none';
  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement);
}


@Injectable({
  selector: 'app-upload-instance-solution-dialog',
  templateUrl: 'upload-instance-solution-dialog.html',
})
export class UploadInstanceSolutionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UploadInstanceSolutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onSubmitSolution() {
    console.log(this.data.solution);
    this.dialogRef.close();
  }
}


@Injectable({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css'],
})
export class CompetitionDetailsComponent implements OnInit {
  competition: ICompetition;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.competition = this.route.snapshot.data.competition;
  }

  downloadSubject() {
    forceDownload(this.competition.subjectUrl);
  }

  downloadInstanceInput(instance: IInstance) {
    forceDownload(instance.inputUrl);
  }

  uploadInstanceSolution(instance: IInstance) {
    this.dialog.open(UploadInstanceSolutionDialogComponent, {
      width: '300px',
      data: {
        instance,
        solution: null,
      }
    });
  }
}
