import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdmissionComponent } from './admission/admission.component';
import { AdmissionViewComponent } from './admission-view/admission-view.component';
import { PaymentComponent } from './payment/payment.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Configuration } from './app.constants';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdmissionComponent,
    AdmissionViewComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, ModalModule.forRoot(),
    AppRoutingModule, ReactiveFormsModule, FormsModule,
  ],
  providers: [Configuration],
  bootstrap: [AppComponent]
})
export class AppModule { }
