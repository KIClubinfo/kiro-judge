import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISubmission } from '../interfaces/submission.interface';


@Injectable({ providedIn: 'root' })
export class SubmissionService {

  constructor(private http: HttpClient) { }

  create(instanceId: number, teamId: number, solution: any): Observable<ISubmission> {
    return this.http.post<ISubmission>('/submissions', {
      teamId,
      instanceId,
      solution,
    });
  }
}
