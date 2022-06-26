import { Component, OnInit } from '@angular/core';
import { admission } from '../models';
import { RestService } from '../_services/rest.service';

@Component({
  selector: 'app-admission-view',
  templateUrl: './admission-view.component.html',
  styleUrls: ['./admission-view.component.css']
})
export class AdmissionViewComponent implements OnInit {
  spinner = false;
  admtdStdnts: admission[] = []
  constructor(private svc: RestService) { }

  ngOnInit(): void {
    this.getAdmittedStudents();
  }

  getAdmittedStudents(): void {
    this.spinner = true;

    this.svc.addUpdDel<any>('Admission/GetAdmission', new admission())
    .subscribe({
      next: this.handleRes.bind(this),
      error: this.handleError.bind(this)
   });
  }

  private handleRes(arg: admission[]): void {
    this.spinner = false;
    // console.log(JSON.stringify(arg));
    debugger;
    this.admtdStdnts = [];
    this.admtdStdnts.push(...arg);
  }

  private handleError(): void {
    this.spinner = false;
  }

}
