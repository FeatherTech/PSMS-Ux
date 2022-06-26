import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LOGIN_MASTER } from '../models';
import { RestService } from './rest.service';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<LOGIN_MASTER>;
    public currentUser: Observable<LOGIN_MASTER>;

    constructor(private svc: RestService, private router: Router) {
        // this.currentUserSubject = new BehaviorSubject<LOGIN_MASTER>(JSON.parse(localStorage.getItem('currentUser')));
        // this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Observable<LOGIN_MASTER> {
        return this.currentUserSubject.asObservable();
    }

    login(usrName: string, pass: string) {
      let login = new LOGIN_MASTER();
      login.LOGIN_USER = usrName;
      login.LOGIN_PASS = pass;
      login.DEL_FLG = 'S';
      this.svc.addUpdDel('LoginIn', login).subscribe(
        res => {
          debugger;
          this.currentUserSubject.next(res);
          // rediterc to admission page
          this.router.navigate(['admission-form']);
        },
        err => {}
      );
      // return login;
        // return this.http.post<any>(`/users/authenticate`, { username, password })
        //     .pipe(map(user => {
        //         // login successful if there's a jwt token in the response
        //         if (user && user.token) {
        //             // store user details and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('currentUser', JSON.stringify(user));
        //             this.currentUserSubject.next(user);
        //         }

        //         return user;
        //     }));
    }

    logout() {
        // remove user from local storage to log user out
        // localStorage.removeItem('currentUser');
        this.currentUserSubject.next(new LOGIN_MASTER());
    }
}
