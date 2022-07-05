import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../_services';
import { MessageServiceService } from '../_services/message-service.service';
import { RestService } from '../_services/rest.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed = true;
  loggedInusrName = '';
  usrAuthenticated = false;
  subscription: Subscription;
  constructor(private svc: RestService,
              private messageService: MessageServiceService,
              private authenticationService: AuthenticationService) {
    // debugger;
    // this.subscription = this.authenticationService.currentUserValue.subscribe(
    //   res => {
    //     debugger;
    //     if (res !== null && !(Object.keys(res).length === 0)) {
    //       this.loggedInusrName = res[0].NAME;
    //       this.usrAuthenticated = true;
    //     }
    //   },
    //   err => {}
    // );
  }

  ngOnInit() {
  }

  // private getDomain(): void {
  //   this.svc.getAll<DOMAIN[]>('domain').subscribe(
  //     (data: DOMAIN[]) => this.domains = data,
  //     error => { console.log(error); },
  //     () => { }
  //   );
  // }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}
