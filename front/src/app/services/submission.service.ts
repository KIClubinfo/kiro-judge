import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISubmission } from '../interfaces/submission.interface';
import { Submission } from '../../../../back/src/judge/entities/submission.entity';


@Injectable({ providedIn: 'root' })
export class SubmissionService {

  constructor(private http: HttpClient) { }

  create(instanceId: number, teamId: number, solution: any): Observable<ISubmission> {
    return this.http.post<Submission>('/submissions', {
      teamId,
      instanceId,
      solution,
    });
  }
}
