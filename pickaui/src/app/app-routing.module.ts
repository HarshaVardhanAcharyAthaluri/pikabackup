import { NgModule } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {UnathorizedComponent} from './components/unathorized/unathorized.component';

import {AuthGuard} from './guards/auth.guard';
import {Role} from './models/role';
import { EmployeelistComponent } from './components/employeelist/employeelist.component';
import { ContactComponent } from './components/contact/contact.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { ContactRegisterComponent } from './components/contact-register/contact-register.component';
import { HomeComponent } from './components/home/home.component';
import { C4ccustomerdetailsComponent } from './components/c4ccustomerdetails/c4ccustomerdetails.component';
import { EmployeetilesComponent } from './employeetiles/employeetiles.component';
import { ServicecontractsComponent } from './components/servicecontracts/servicecontracts.component';
import { ServicecontractDetailsComponent } from './components/servicecontract-details/servicecontract-details.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ServicerequestsComponent } from './components/servicerequests/servicerequests.component';
import { NewServiceRequestComponent } from './components/newservicerequest/newservicerequest.component';
import { ServiceRequestDetails } from './models/servicerequestdetails';
import { ServicerequestdetailsComponent } from './components/servicerequestdetails/servicerequestdetails.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TicketComponent }  from './components/ticket/ticket.component';

const routes: Routes = [
  
  {path:'admin',
  component:EmployeelistComponent,
  canActivate: [AuthGuard],
   data: {roles: [Role.ADMIN]}
  },
  { path: 'employee-list',
   component: EmployeelistComponent,
   canActivate: [AuthGuard],
   data: {roles: [Role.ADMIN]} 
  },
  {
    path:'update-employee/:id',
    component:RegisterComponent,
    canActivate:[AuthGuard],
    data:{roles:[Role.ADMIN]}
  },
  {
    path:'update-contact/:id',
    component:ContactRegisterComponent,
    canActivate:[AuthGuard],
    data:{roles:[Role.ADMIN]}
  },
  {
    path:'update-customer/:id',
    component:CustomerRegisterComponent,
    canActivate:[AuthGuard],
    data:{roles:[Role.ADMIN]}
  },
  {
    path:'c4ccustomer/:id',
    component:C4ccustomerdetailsComponent,
    canActivate:[AuthGuard],
    data:{roles:[Role.ADMIN]}
  },
  { path: 'register',
   component: RegisterComponent,
   canActivate: [AuthGuard],
   data: {roles: [Role.ADMIN]} 
  },
  {path:'contact-list',
  component:ContactComponent,
  canActivate:[AuthGuard],
  data:{roles:[Role.ADMIN,Role.USER]}
  },
  {path:'customer-list',
  component:CustomerComponent,
  canActivate:[AuthGuard],
  data:{roles:[Role.ADMIN,Role.USER]}
  },
  {path:'customer-register',
  component:CustomerRegisterComponent,
  canActivate:[AuthGuard],
  data:{roles:[Role.ADMIN]}
  },
  {path:'contact-register',
  component:ContactRegisterComponent,
  canActivate:[AuthGuard],
  data:{roles:[Role.ADMIN]}
  },
  { path: 'home',
  component: HomeComponent,
  canActivate:[AuthGuard],
  data:{roles:[Role.ADMIN,Role.USER]}
  },
  { path: 'ticket',
  component: TicketComponent,
  canActivate:[AuthGuard],
  data:{roles:[Role.ADMIN,Role.USER]}
  },
  { path: 'employeetiles',
  component: EmployeetilesComponent,
  canActivate:[AuthGuard],
  data:{roles:[Role.ADMIN]}
  },
  { path: 'servicecontracts',
  component: ServicecontractsComponent,
  canActivate:[AuthGuard],
  data:{roles:[Role.USER]}
  },
  
  { path: 'servicecontractdetails/:contractid',
  component: ServicecontractDetailsComponent,
  canActivate:[AuthGuard],
  data:{roles:[Role.USER]}
  },
  { path: 'reports',
  component: ReportsComponent,
  canActivate:[AuthGuard],
  data:{roles:[Role.USER]}
  },
  { path: 'servicerequests',
  component: ServicerequestsComponent,
  canActivate:[AuthGuard],
  data:{roles:[Role.USER]}
  },
  { path: 'newservicerequests',
  component: NewServiceRequestComponent,
  canActivate:[AuthGuard],
  data:{roles:[Role.USER]}
  },
  { path: 'servicerequestdetails/:servicerequestid',
  component: ServicerequestdetailsComponent,
  canActivate:[AuthGuard],
  data:{roles:[Role.USER]}
  },
  { path: 'welcome',
  component: WelcomeComponent,
  canActivate:[AuthGuard],
  data:{roles:[Role.USER]}
  },

  { path: 'login', component: LoginComponent},
  { path:'404',component:NotFoundComponent},
  { path:'401', component: UnathorizedComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
constructor(private router: Router) {
  //For unkhown pages
  this.router.errorHandler = (error: any) => {
    this.router.navigate(['/404']);
  }
}
}
