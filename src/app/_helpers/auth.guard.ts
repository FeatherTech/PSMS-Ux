import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let toreturn = false;
    this.authenticationService.currentUserValue.subscribe(
      res => {
        debugger;
        if (res !== null && !(Object.keys(res).length === 0)) {
          toreturn =  true;
        }
        else {
          this.router.navigate(['/login']);
          toreturn =  false;
        }
      },
      err => {
        this.router.navigate(['/login']);
        toreturn = false;
      }
    );
    return toreturn;
  }
}
