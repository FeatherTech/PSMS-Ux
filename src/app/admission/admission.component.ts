import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { admission } from '../models';
import { DOCUMENT_MASTER } from '../models/DOCUMENT_MASTER';
import { SUBDOMAIN } from '../models/SUBDOMAIN';
import { MessageServiceService } from '../_services/message-service.service';
import { RestService } from '../_services/rest.service';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {

  admissionFrm: FormGroup;
  get adm() { return this.admissionFrm.controls; }
  showAgree = false;
  criterion: string;
  selectedSubdomainId: number;
  subscription: Subscription;
  readCriterion = false;
  admissionOf: string = 'A-10';
  stream : string ;
  accomodation : string;
  isdisable : string;
  sub1: string;
  sub2:string;
  sub3: string;
  sub4: string;
  sub5: string;
  sub6: string;


  spinner = true;
  showPrevious = false;
  preview = false;
  showNext = false;
  showSubCategory = false;
  title: string;
  constructor(private svc: RestService, private router: Router,
    private messageService: MessageServiceService, private frmBldr: FormBuilder) { }

  ngOnInit(): void {
    // this.getCourse();
    this.spinner = false;
    this.formInit();

  }

  handleChange(ev:string)
  {
    debugger;
   this.stream=ev;
   if (ev=='ARTS')
   {
  this.adm['sub1'].setValue('ENGLISH');
  this.adm['sub2'].setValue('EDUCATION');
  this.adm['sub3'].setValue('POLITICAL SCIENCE');
  this.adm['sub4'].setValue('HISTORY');
  this.adm['sub5'].setValue('ALT ENGLISH');
  this.adm['sub6'].setValue('ECONOMICS');
   }
   if (ev=='SCIENCE')
   {
  this.adm['sub1'].setValue('ENGLISH');
  this.adm['sub2'].setValue('CHEMISTRY');
  this.adm['sub3'].setValue('PHYSICS');
  this.adm['sub4'].setValue('BIOLOGY');
  this.adm['sub5'].setValue('MATHS');
  this.adm['sub6'].setValue('ALT ENGLISH');
   }
   else
   {
  this.adm['sub1'].setValue('ENGLISH');
  this.adm['sub2'].setValue('BUSINESS STUDIES');
  this.adm['sub3'].setValue('ACCOUNTANCY');
  this.adm['sub4'].setValue('ECONOMICS');
  this.adm['sub5'].setValue('ENTREPRENEURSHIP');
  this.adm['sub6'].setValue('ALT ENGLISH');
  
   }
  }
  private formInit(): void {
    this.admissionFrm = this.frmBldr.group({
      serial_no: [''],
      adm_id: [''],
      session: [''],
      admin_in_class: [''],
      class: [''],
      regn_no: [''],
      core_subj: [''],
      gen_subj: [''],
      stream: [''],
      first_name: [''],
      last_name: [''],
      middle_name: [''],
      dob: [''],
      phone: [''],
      email: [''],
      gender: [''],
      category: [''],
      tribe: [''],
      marital_status: [''],
      religion: [''],
      nationality: [''],
      blood_group: [''],
      ident_mark: [''],
      phy_challenge: [''],
      father_name: [''],
      father_phone: [''],
      mother_name: [''],
      mother_phone: [''],
      guardian_name: [''],
      guardian_phone: [''],
      guardian_addr: [''],
      per_addr: [''],
      per_city_town: [''],
      per_dist: [''],
      per_state: [''],
      per_pin: [''],
      comu_addr: [''],
      comu_city_town: [''],
      comu_dist: [''],
      comu_state: [''],
      comu_pin: [''],
      payment_stat: [''],
      hostel_req: [''],
      form_cmpl_stat: [''],
      approval_stat: [''],
      remarks: [''],
      del_flg: [''],
      sub1: [''],
      sub2: [''],
      sub3: [''],
      sub4: [''],
      sub5: [''],
      sub6: [''],
      sub7: [''],
      sub8: [''],
      sub9: [''],
      sub10: [''],
      prev_school: [''],
      prev_board: [''],
      prev_roll: [''],
      prev_passyear: [''],
      prev_div: [''],
      prev_percent: [''],
      prev_class: [''],
      guardian_rel: [''],
      father_qual: [''],
      father_ocu: [''],
      father_des: [''],
      mother_qual: [''],
      mother_ocu: [''],
      mother_des: [''],
      per_loc: [''],
      per_ward: [''],
      per_po: [''],
      comu_loc: [''],
      comu_ward: [''],
      comu_po: [''],
      per_comu_same: [''],
      year: [''],
      orgl_user: [''],
      orgl_stamp: [''],
      updt_user: [''],
      updt_stamp: [''],

    });
  }

  private mappFormDataToModel(): admission {
    let newAdm = new admission();
    newAdm.serial_no = this.adm['serial_no'].value;
    newAdm.adm_id = this.adm['adm_id'].value;
    newAdm.session = this.adm['session'].value;
    newAdm.admin_in_class = this.adm['admin_in_class'].value;
    newAdm.class = this.adm['class'].value;
    newAdm.regn_no = this.adm['regn_no'].value;
    newAdm.core_subj = this.adm['core_subj'].value;
    newAdm.gen_subj = this.adm['gen_subj'].value;
    newAdm.stream = this.adm['stream'].value;
    newAdm.first_name = this.adm['first_name'].value;
    newAdm.last_name = this.adm['last_name'].value;
    newAdm.middle_name = this.adm['middle_name'].value;
    newAdm.dob = this.adm['dob'].value;
    newAdm.phone = this.adm['phone'].value;
    newAdm.email = this.adm['email'].value;
    newAdm.gender = this.adm['gender'].value;
    newAdm.category = this.adm['category'].value;
    newAdm.tribe = this.adm['tribe'].value;
    newAdm.marital_status = this.adm['marital_status'].value;
    newAdm.religion = this.adm['religion'].value;
    newAdm.nationality = this.adm['nationality'].value;
    newAdm.blood_group = this.adm['blood_group'].value;
    newAdm.ident_mark = this.adm['ident_mark'].value;
    newAdm.phy_challenge = this.adm['phy_challenge'].value;
    newAdm.father_name = this.adm['father_name'].value;
    newAdm.father_phone = this.adm['father_phone'].value;
    newAdm.mother_name = this.adm['mother_name'].value;
    newAdm.mother_phone = this.adm['mother_phone'].value;
    newAdm.guardian_name = this.adm['guardian_name'].value;
    newAdm.guardian_phone = this.adm['guardian_phone'].value;
    newAdm.guardian_addr = this.adm['guardian_addr'].value;
    newAdm.per_addr = this.adm['per_addr'].value;
    newAdm.per_city_town = this.adm['per_city_town'].value;
    newAdm.per_dist = this.adm['per_dist'].value;
    newAdm.per_state = this.adm['per_state'].value;
    newAdm.per_pin = this.adm['per_pin'].value;
    newAdm.comu_addr = this.adm['comu_addr'].value;
    newAdm.comu_city_town = this.adm['comu_city_town'].value;
    newAdm.comu_dist = this.adm['comu_dist'].value;
    newAdm.comu_state = this.adm['comu_state'].value;
    newAdm.comu_pin = this.adm['comu_pin'].value;
    newAdm.payment_stat = this.adm['payment_stat'].value;
    newAdm.hostel_req = this.adm['hostel_req'].value;
    newAdm.form_cmpl_stat = this.adm['form_cmpl_stat'].value;
    newAdm.approval_stat = this.adm['approval_stat'].value;
    newAdm.remarks = this.adm['remarks'].value;
    newAdm.del_flg = this.adm['del_flg'].value;
    newAdm.phy_challenge=this.adm['phy_challenge'].value;
    newAdm.sub1 = this.adm['sub1'].value;
    newAdm.sub2 = this.adm['sub2'].value;
    newAdm.sub3 = this.adm['sub3'].value;
    newAdm.sub4 = this.adm['sub4'].value;
    newAdm.sub5 = this.adm['sub5'].value;
    newAdm.sub6 = this.adm['sub6'].value;
    newAdm.sub7 = this.adm['sub7'].value;
    newAdm.sub8 = this.adm['sub8'].value;
    newAdm.sub9 = this.adm['sub9'].value;
    newAdm.sub10 = this.adm['sub10'].value;
    newAdm.prev_school = this.adm['prev_school'].value;
    newAdm.prev_board = this.adm['prev_board'].value;
    newAdm.prev_roll = this.adm['prev_roll'].value;
    newAdm.prev_passyear = this.adm['prev_passyear'].value;
    newAdm.prev_div = this.adm['prev_div'].value;
    newAdm.prev_percent = this.adm['prev_percent'].value;
    newAdm.prev_class = this.adm['prev_class'].value;
    newAdm.guardian_rel = this.adm['guardian_rel'].value;
    newAdm.father_qual = this.adm['father_qual'].value;
    newAdm.father_ocu = this.adm['father_ocu'].value;
    newAdm.father_des = this.adm['father_des'].value;
    newAdm.mother_qual = this.adm['mother_qual'].value;
    newAdm.mother_ocu = this.adm['mother_ocu'].value;
    newAdm.mother_des = this.adm['mother_des'].value;
    newAdm.per_loc = this.adm['per_loc'].value;
    newAdm.per_ward = this.adm['per_ward'].value;
    newAdm.per_po = this.adm['per_po'].value;
    newAdm.comu_loc = this.adm['comu_loc'].value;
    newAdm.comu_ward = this.adm['comu_ward'].value;
    newAdm.comu_po = this.adm['comu_po'].value;
    newAdm.per_comu_same = this.adm['per_comu_same'].value;
    newAdm.year = this.adm['year'].value;
    newAdm.orgl_user = this.adm['orgl_user'].value;
    newAdm.orgl_stamp = this.adm['orgl_stamp'].value;
    newAdm.updt_user = this.adm['updt_user'].value;
    newAdm.updt_stamp = this.adm['updt_stamp'].value;
    return newAdm;
  }

  saveNewAdmission(): void {
    this.spinner = true;
    const newAdm = this.mappFormDataToModel();
    this.svc.addUpdDel<any>('Admission/InsertAdmission', newAdm)
      .subscribe({
        next: this.handleRes.bind(this),
        error: this.handleError.bind(this)
      });

  }

  private handleRes(admissionNumber: string): void {
    this.spinner = false;
    this.admissionFrm.reset();
  }

  private handleError(arg: any): void {
    this.spinner = false;
  }

}
