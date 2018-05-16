import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  private get authService(): AuthService {
    return this.injector.get(AuthService);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl = environment.baseUrl;

    // For backend API
    if (req.url.startsWith('/')) {
      req = req.clone({
        url: baseUrl + req.url,
        headers: req.headers.set('Authorization', 'bearer ' + this.authService.getAccessToken())
      });
    }

    return next.handle(req);
  }
}
