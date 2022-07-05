
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
// import { DOMAIN } from '../models/DOMAIN';
// import { PubSubModel } from '../models/PubSupModel';
// import { SUBDOMAIN } from '../models/SUBDOMAIN';


@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  private subject = new Subject<any>();
  // private subjectDomain = new Subject<DOMAIN>();
  // private pubSupModel = new Subject<PubSubModel>();
  // private subjectSubdomain = new BehaviorSubject<SUBDOMAIN>(new SUBDOMAIN());



  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  // sendDomainId(domain: DOMAIN) {
  //   // debugger;
  //   this.subjectDomain.next(domain);
  // }

  // setDomainAndSubDomain(pubsupModel: PubSubModel) {
  //   this.pubSupModel.next(pubsupModel);
  // }

  // getDomainAndSubDomain() {
  //   return this.pubSupModel.asObservable();
  // }

  // clearMessage() {
  //   this.pubSupModel.next(new PubSubModel(0, 0, ''));
  // }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
  // getDomainToShow(): Observable<DOMAIN> {
  //   return this.subjectDomain.asObservable();
  // }

  // sendSelectedCourse(subdomain: SUBDOMAIN) {
  //   this.subjectSubdomain.next(subdomain);
  // }

  // getSelectedCourse(): Observable<SUBDOMAIN> {
  //   return this.subjectSubdomain.asObservable();
  // }

  constructor() { }
}
