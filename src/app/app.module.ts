import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReloginComponent } from './login/relogin/relogin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SupportComponent } from './support/support.component';
import { BillingComponent } from './billing/billing.component';
import { CmsComponent } from './cms/cms.component';
import { HeaderComponent } from './global/header/header.component';
import { UsersComponent } from './users/users.component';
import { DetailComponent } from './cms/detail/detail.component';
import { ResidenceComponent } from './residence/residence.component'; 
import { NgxLoadingModule } from 'ngx-loading';
import { InprogressComponent } from './support/inprogress/inprogress.component';
import { ClosedComponent } from './support/closed/closed.component';
import { RtRwComponent } from './rt-rw/rt-rw.component';
import { PanicButtonComponent } from './panic-button/panic-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    ReloginComponent,
    SupportComponent,
    BillingComponent,
    CmsComponent,
    HeaderComponent,
    UsersComponent,
    DetailComponent,
    ResidenceComponent,
    InprogressComponent,
    ClosedComponent,
    RtRwComponent,
    PanicButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, HttpClientModule, 
    FormsModule,
    EditorModule,
    FormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
