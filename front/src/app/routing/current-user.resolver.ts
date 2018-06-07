import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';


@Injectable()
export class CurrentUserResolver implements Resolve<IUser> {
  constructor(
    private readonly userService: UserService,
  ) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<IUser> {
    return this.userService.getCurrentUser();
  }
}
