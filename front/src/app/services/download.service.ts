import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInstance } from '../interfaces/instance.interface';
import { ICompetition } from '../interfaces/competition.interface';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


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


@Injectable({ providedIn: 'root' })
export class DownloadService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  downloadSubject(competition: ICompetition) {
    const accessToken = this.authService.getAccessToken();
    forceDownload(environment.baseUrl + `/competitions/${competition.id}/download?token=${accessToken}`);
  }

  downloadInstanceInput(instance: IInstance) {
    const accessToken = this.authService.getAccessToken();
    forceDownload(environment.baseUrl + `/instances/${instance.id}/download?token=${accessToken}`);
  }
}
