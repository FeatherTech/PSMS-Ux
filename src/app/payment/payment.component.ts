import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { admission } from '../models';
import { fees_structure } from '../models/FEES_STRUCTURE';
import { RestService } from '../_services/rest.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('pmtmodal', { static: true }) pmtmodal: TemplateRef<any>;
  modalRef?: BsModalRef;
  config = {
    keyboard: true
  };
  spinner = false;
  spinnerPmt = true;
  admtdStdnts: admission[] = [];
  admtdStdnToShowInModal: admission;
  rcvdFesStructure: fees_structure[] = [];
  sumTotalFee = 0;
  admtdStdntsToBind: admission[] = [];
  constructor(private svc: RestService,
    private modalService: BsModalService) { }
  // paymentType = { id:'NEW' , desc: 'New Admission' };

  // paymentTypeList = [
  //   { id: 'NEW', desc: 'New Admission' },
  //   { id: 'OLD', desc: 'Fees Payment' }
  //   ];


  //   dummyTableList = [
  //     { regNo: '20220001' , name: 'RANJAN ROY', phone: '9832166699' , class: '11' ,  address: 'KOLKATA' },
  //     { regNo: '20220002' , name: 'SANJAY DEY', phone: '9933560990' , class: '11' , address: 'KOLKATA'},
  //     { regNo: '20220003' , name: 'AMITABHA KHAN', phone: '8017099991' , class: '11' , address: 'HOOGHLY'}
  //     ];


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
    this.admtdStdntsToBind = [];
    this.admtdStdnts.push(...arg);
    this.admtdStdntsToBind.push(...arg);
  }

  private handleError(): void {
    this.spinner = false;
  }

  filterAdmittedRecord(evnt: any): void {
    console.log(evnt.value);
    let valueTosearch = evnt.value;
    valueTosearch = valueTosearch.toLocaleLowerCase();
    this.admtdStdntsToBind = [];
    if (valueTosearch === '' || null === valueTosearch) {
      this.admtdStdntsToBind = this.admtdStdnts;
    } else {
      const s = this.admtdStdnts.filter(e => ((e.first_name.toLocaleLowerCase().includes(valueTosearch))
        || e.adm_id.toLowerCase().includes(valueTosearch)
        || e.stream.toLowerCase().includes(valueTosearch)
        || e.phone.toLowerCase().includes(valueTosearch)));
      this.admtdStdntsToBind = s;
    }
  }


  rowClick(admStd: admission) {
    // open modal to show the complete data
    this.admtdStdnToShowInModal = admStd;
    this.modalRef = this.modalService.show(this.pmtmodal, Object.assign({}, { class: 'modal-lg', ignoreBackdropClick: true,
    keyboard: false }));
    this.getFeesStructure(admStd);
  }

  closeModal() {
    this.modalRef?.hide();
    this.admtdStdnToShowInModal = new admission();
  }

  private getFeesStructure(admStd: admission): void {
    this.spinnerPmt = true;
    this.rcvdFesStructure = [];
    this.sumTotalFee = 0;
    const feeStr = new fees_structure();
    feeStr.session = admStd.session;
    feeStr.class = '11';
    feeStr.stream = admStd.stream;
    feeStr.type = 'H';
    feeStr.installment = 1;
    this.svc.addUpdDel<any>('Admission/GetFeesStructure', feeStr)
      .subscribe(
        res => {
          this.rcvdFesStructure = res;
          this.rcvdFesStructure.forEach((e) => {
            this.sumTotalFee += (+e.amount);
          });
          this.spinnerPmt = false;
        },
        err => {
          this.spinnerPmt = false;
         }
      );
  }

  // setPaymentType(val: any) {
  //   // debugger;
  //   console.log(val.value);
  //   this.paymentType.desc = val.value;
  //   this.paymentType.id = this.paymentTypeList.filter(x => x.desc.toString() === val.value.toString())[0].id;
  // }

}
