import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Configuration } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private url: string;

  constructor(private http: HttpClient, private configuration: Configuration) {
    this.url = configuration.server;
  }

  public getAll<T>(ofwhat: string): Observable<T> {
    return this.http.get<T>(this.url + ofwhat);
  }

  public getSingle<T>(ofwhat: string, id: number): Observable<T> {
    return this.http.get<T>(this.url + ofwhat + '/' + id);
  }

  public add<T>(ofwhat: string, data: T): Observable<T> {
    return this.http.post<T>((this.url + ofwhat) , data);
  }

  public addUpdDel<T>(ofwhat: string, data: T): Observable<T> {
    return this.http.post<T>((this.url + ofwhat) , data);
  }

  public update<T>(ofwhat: string, data: T): Observable<T> {
    return this.http.put<T>(this.url + ofwhat, data);
  }

  public delete<T>(ofwhat: string, id: number): Observable<T> {
    return this.http.delete<T>(this.url + ofwhat + '/' + id);
  }
}
