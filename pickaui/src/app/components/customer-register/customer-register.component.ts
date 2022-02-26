import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.scss']
})
export class CustomerRegisterComponent implements OnInit {

  customer:Customer = new Customer();

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  customerId;
  buttontext='Create Customer'
  constructor(
    private customerService: CustomerService,
    private route:ActivatedRoute,
    private router:Router
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.customerId = params.get('id');
        this.getCustomer(this.customerId);
       
      }
    });
  }

  getCustomer(customerId){
    this.buttontext = 'Update Customer';
    this.customerService.getCustomerById(customerId).subscribe(customer=>{
      this.customer = customer;
    },err=>{
      this.errorMessage = err.error.message;
    });    
    return this.customer;
  }

  updateCustomer(){
    this.customerService.updateCustomer(this.customerId,this.customer).subscribe(updatedCustomer=>{
      this.customer = updatedCustomer;
      this.isSuccessful = true;
      this.router.navigate(['customer-list']);
    },err=>{
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
    });
  }

  onSubmit() {
    this.customerService.register(this.customer).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['customer-list']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
