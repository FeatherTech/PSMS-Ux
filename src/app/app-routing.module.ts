import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmissionViewComponent } from './admission-view/admission-view.component';
import { AdmissionComponent } from './admission/admission.component';
import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  { path: '', redirectTo: 'admsn', pathMatch: 'full' },
  { path: 'admsn', component: AdmissionComponent },
  { path: 'admvw', component: AdmissionViewComponent },
  { path: 'pmt', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
