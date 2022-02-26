import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  
  customerList: Array<any>;
  erromsg='';
  successmsg='';

  constructor(private customerSrvice:CustomerService,private tokenStorage:TokenStorageService) {

   }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
     this.customerSrvice.getAllCustomers().subscribe(contacts=>{
      this.customerList = contacts;
      },err=>{

     });
    }
  }

  deleteCustomer(customerId){
    this.customerSrvice.deleteCustomer(customerId).subscribe(cont=>{
        this.customerSrvice.getAllCustomers().subscribe(updateCustomerList=>{
          this.customerList = updateCustomerList;
         
        });
        this.successmsg = cont;
    },err=>{
        this.erromsg = err.error.error;
    });
}

}
