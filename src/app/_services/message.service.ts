import { PubSubModel } from './Models/model.PubSupModel';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<PubSubModel>();
  constructor() { }

  send(message: PubSubModel) {
    this.subject.next(message);
  }

  get(): Observable<PubSubModel> {
    return this.subject.asObservable();
  }
}
