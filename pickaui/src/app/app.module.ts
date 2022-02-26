import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UnathorizedComponent } from './components/unathorized/unathorized.component';
import { authInterceptorProviders } from './services/auth-interceptor.service';
import { EmployeelistComponent } from './components/employeelist/employeelist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { ContactComponent } from './components/contact/contact.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { ContactRegisterComponent } from './components/contact-register/contact-register.component';
import { HomeComponent } from './components/home/home.component';
import { C4ccustomerdetailsComponent } from './components/c4ccustomerdetails/c4ccustomerdetails.component';
import { EmployeetilesComponent } from './employeetiles/employeetiles.component';
import { ServicecontractsComponent } from './components/servicecontracts/servicecontracts.component';
import { TicketComponent }  from './components/ticket/ticket.component';
import { ServicecontractDetailsComponent } from './components/servicecontract-details/servicecontract-details.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {HeaderComponent}  from './components/header/header.component'
import { ReportsComponent } from './components/reports/reports.component';
import { ServicerequestsComponent } from './components/servicerequests/servicerequests.component';
import { NewServiceRequestComponent } from './components/newservicerequest/newservicerequest.component';
import { ServicerequestdetailsComponent } from './components/servicerequestdetails/servicerequestdetails.component';
import { WelcomeComponent } from './components/welcome/welcome.component' 
import {MatCardModule} from '@angular/material/card';
import { DropdownDirective } from './directive/dropdown';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    UnathorizedComponent,
    EmployeelistComponent,
    ContactComponent,
    CustomerComponent,
    CustomerRegisterComponent,
    ContactRegisterComponent,
    HomeComponent,
    C4ccustomerdetailsComponent,
    EmployeetilesComponent,
    ServicecontractsComponent,
    ServicecontractDetailsComponent,
    ReportsComponent,
    ServicerequestsComponent,
    NewServiceRequestComponent,
    ServicerequestdetailsComponent,
    WelcomeComponent,
    HeaderComponent,
    TicketComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTreeModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
