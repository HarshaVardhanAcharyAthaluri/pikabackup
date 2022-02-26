import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { c4cCustomerDetails } from 'src/app/models/c4cCustomerDetails';
import { Contact } from 'src/app/models/contact';
import { C4ccustomerdetailsService } from 'src/app/services/c4ccustomerdetails.service';
import { ContactService } from 'src/app/services/contact.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn;
 contactList:Array<any>;
 c4cCustomerList:Array<any>;
  contact:Contact = new Contact();
  showspinner:boolean = false;
  contactspineer:boolean = false;
  c4ccustomer:c4cCustomerDetails = new c4cCustomerDetails();
  error:string;

  constructor( private route:ActivatedRoute,
    private contactService:ContactService,
    private tokenStorage: TokenStorageService,
    private c4ccustomerservice:C4ccustomerdetailsService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.contactService.getAllContacts().subscribe(contact=>{
        this.contactList = contact;
        this.contactList.forEach(x=>{
          if(x.name === this.tokenStorage.getUser().name){
             this.contact = x;
             this.getc4cCustomer(this.contact.refCustomeId.customerId);
             this.getAllc4cCustomer(this.contact.refCustomeId.customerId);
          }
        });
      });
    }
  }

  getc4cCustomer(accountId){
    this.showspinner = true;
    this.c4ccustomerservice.getc4cCustomerDetails(accountId).subscribe(customer=>{
      this.c4ccustomer = customer.d.results[0];
      if(customer.d.results[0] === undefined){
            this.error = 'CustomerId not found';
      }
        this.showspinner = false;
    },err=>{
      this.showspinner = false;
    });

  }

  getAllc4cCustomer(accountId){
    this.contactspineer = true;
    this.c4ccustomerservice.getAllc4cCustomerDetails(accountId).subscribe(customerlist=>{
      this.c4cCustomerList = customerlist.d.results;
      if(customerlist.d.results[0] === undefined){
            this.error = 'CustomerId not found';
      }
        this.contactspineer = false;
    },err=>{
      this.contactspineer = false;
    });

  }

}
