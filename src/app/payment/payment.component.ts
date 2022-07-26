import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { admdm, admission, misc_fees, student, student_payment } from '../models';
import { fees_structure } from '../models/FEES_STRUCTURE';
import { RestService } from '../_services/rest.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('misfeesaddmodal', { static: true }) misfeesaddmodal: TemplateRef<any>;
  showDtlAndPmt = false;
  modalRef2?: BsModalRef;
  config = {
    keyboard: true
  };
  spinner = false;
  spinnerPmt = true;
  misFesspinner = true;
  admtdStdnts: admission[] = [];
  miscFeesToShow: misc_fees[] = [];
  selectedmiscFees = new misc_fees();
  isConcession = false;
  showMsg = false;
  msg = '';
  admtdStdnDtlToShow: admission;
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
      .subscribe(
        res => {
          this.spinner = false;
          this.admtdStdnts = [];
          this.admtdStdntsToBind = [];
          this.admtdStdnts.push(...res);
          this.admtdStdntsToBind.push(...res);
        },
        err => { this.spinner = false; });
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
        || e.session.toLowerCase().includes(valueTosearch)
        || e.stream.toLowerCase().includes(valueTosearch)
        || e.phone.toLowerCase().includes(valueTosearch)));
      this.admtdStdntsToBind = s;
    }
  }


  rowClick(admStd: admission) {
    // show the complete data
    this.admtdStdnDtlToShow = admStd;
    this.showDtlAndPmt = true;
    this.getFeesStructure(admStd);
  }

  resetMsg(): void {
    this.showMsg = false;
    this.msg = '';
  }

  clickMisFeesAdd(option = 0): void {
    this.isConcession = option === 1;
    this.resetMsg();
    this.modalRef2 = this.modalService.show(this.misfeesaddmodal, Object.assign({}, {
      id: 2, class: 'second',
      ignoreBackdropClick: true,
      keyboard: false
    }));
    this.misFesspinner = true;
    this.svc.addUpdDel<any>('Admission/GetMiscFees', new admission())
      .subscribe(
        res => {
          console.log(JSON.stringify(res));
          this.misFesspinner = false;
          this.miscFeesToShow = [];
          if (this.isConcession) {
            this.miscFeesToShow = res.filter(e => e.con_flag === 'Y');
          } else {
            this.miscFeesToShow = res.filter(e => e.con_flag !== 'Y');
          }
        },
        err => { this.misFesspinner = false; });
  }

  onParticularsChng(misFeedHead: string): void {
    console.log(misFeedHead);
    this.selectedmiscFees = this.miscFeesToShow.filter(e => e.head === misFeedHead)[0];
    console.log(this.selectedmiscFees);
  }

  onAddCkick(): void {
    const feStToAdd = new fees_structure();
    feStToAdd.head = this.selectedmiscFees.head;
    feStToAdd.amount = this.isConcession ? (0 - (+this.selectedmiscFees.amount)) : (+this.selectedmiscFees.amount);
    this.rcvdFesStructure.push(feStToAdd);
    this.sumTotalFee = this.sumTotalFee + (feStToAdd.amount);
    // show msg
    this.showMsg = true;
    this.msg = `${this.isConcession ? 'Concession' : 'Fees'} of ₹${this.selectedmiscFees.amount}
                with particulars ${this.selectedmiscFees.head} added!!`;
    // Reset
    this.selectedmiscFees = new misc_fees();
  }

  close(): void {
    this.selectedmiscFees = new misc_fees();
    this.modalRef2?.hide();
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
    feeStr.installment = '1';
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

  savePmt(): void {
    debugger;
    this.spinnerPmt = true;
    const admdmToSv = new admdm();
    const studentTosv = new student();
    studentTosv.adm_id = this.admtdStdnDtlToShow.adm_id;
    studentTosv.adm_purpose = 'NEWADMISSION';
    studentTosv.session = this.admtdStdnDtlToShow.session;
    studentTosv.cls = this.admtdStdnDtlToShow.class;
    studentTosv.regn_no = this.admtdStdnDtlToShow.regn_no;
    studentTosv.stream = this.admtdStdnDtlToShow.stream;
    studentTosv.name = this.admtdStdnDtlToShow.first_name +  this.admtdStdnDtlToShow.middle_name +  this.admtdStdnDtlToShow.last_name;
    studentTosv.roll = this.admtdStdnDtlToShow.prev_roll;
    studentTosv.address = this.admtdStdnDtlToShow.guardian_addr;
    studentTosv.phone1 = this.admtdStdnDtlToShow.phone;
    studentTosv.email = this.admtdStdnDtlToShow.email;
    studentTosv.gurdain_name = this.admtdStdnDtlToShow.guardian_name;
    // studentTosv.last_installment = this.admtdStdnDtlToShow.;
    // loop over rcvdFesStructure
    this.rcvdFesStructure.forEach(element => {
      const studentPmt = new student_payment();
      studentPmt.session = this.admtdStdnDtlToShow.session;
      studentPmt.class = this.admtdStdnDtlToShow.class;
      studentPmt.type = 'H'; // TODO need to check where this will come from
      studentPmt.amount = element.amount;
      studentPmt.installment = element.installment;
      studentPmt.head = element.head;
      studentPmt.amount = element.amount;
      admdmToSv.studentpayment.push(studentPmt);

      studentTosv.last_installment =  element.installment;
    });
    admdmToSv.student = studentTosv;

    console.log(JSON.stringify(admdmToSv));
    this.svc.addUpdDel<any>('Admission/InsertAdmissionAndPayment', admdmToSv)
      .subscribe(
        res => {
          console.log(JSON.stringify(res) + ' --- Saved');
          this.spinnerPmt = false;
        },
        err => { this.spinnerPmt = false; console.log(JSON.stringify(err)); });

  }
  printPage(): void {
    window.print();
  }

  // setPaymentType(val: any) {
  //   // debugger;
  //   console.log(val.value);
  //   this.paymentType.desc = val.value;
  //   this.paymentType.id = this.paymentTypeList.filter(x => x.desc.toString() === val.value.toString())[0].id;
  // }

}
