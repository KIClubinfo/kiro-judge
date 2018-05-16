import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICompetition } from '../../interfaces/competition.interface';
import { IInstance } from '../../interfaces/instance.interface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { SubmissionService } from '../../services/submission.service';
import { AuthService } from '../../services/auth.service';
import { ISubmission } from '../../interfaces/submission.interface';
import { DownloadService } from '../../services/download.service';


@Component({
  selector: 'app-upload-instance-solution-dialog',
  templateUrl: 'upload-instance-solution-dialog.html',
})
export class UploadInstanceSolutionDialogComponent {
  @ViewChild('file')
  private fileInput;

  private file: File;

  constructor(
    private submissionService: SubmissionService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UploadInstanceSolutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onFileSelected() {
    this.file = this.fileInput.nativeElement.files[0];
  }

  onSubmitSolution() {
    if (!this.file) {
      return this.dialogRef.close();
    }

    const fileReader = new FileReader();
    fileReader.readAsText(this.file, 'UTF-8');
    fileReader.onload = (evt: any) => {
      this.submissionService.create(
        this.data.instance.id,
        this.authService.getCurrentTeamId(),
        evt.target.result,
      ).subscribe((submission: ISubmission) => {
        this.snackBar.open(`Score: ${submission.score}`, null, {
          duration: 3000,
        });
        return this.dialogRef.close();
      }, (response) => {
        this.snackBar.open(response.error.message, null, {
          duration: 3000,
        });
        return this.dialogRef.close();
      });
    };
  }
}


@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css'],
})
export class CompetitionDetailsComponent implements OnInit {
  competition: ICompetition;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private downloadService: DownloadService,
  ) {}

  ngOnInit() {
    this.competition = this.route.snapshot.data.competition;
  }

  downloadSubject() {
    this.downloadService.downloadSubject(this.competition);
  }

  downloadInstanceInput(instance: IInstance) {
    this.downloadService.downloadInstanceInput(instance);
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
