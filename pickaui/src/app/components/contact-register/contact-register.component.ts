import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-contact-register',
  templateUrl: './contact-register.component.html',
  styleUrls: ['./contact-register.component.scss']
})
export class ContactRegisterComponent implements OnInit {

  contact:Contact = new Contact();

  customrList: Array<any>;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  contactId;
  buttontext='Create Contact';

  constructor(
    private authService: AuthService,
    private customerService:CustomerService,
    private route:ActivatedRoute,
    private contactService:ContactService,
    private router:Router) { 

  }

  ngOnInit() {
      this.customerService.getAllCustomers().subscribe(contacts=>{
        this.customrList = contacts;
      },
      err=>{
        
      });
      this.route.paramMap.subscribe(params => {
        if(params.has('id')){
          this.contactId = params.get('id');
          this.getContact(this.contactId);
         
        }
      });
  }

  getContact(contactId){
    this.buttontext = 'Update Contact'
    this.contactService.getContactById(contactId).subscribe(contact=>{
      this.contact = contact;
    },err=>{
      this.errorMessage = err.error.message;
    });    
    return this.contact;
  }

  updateContact(){
    this.contactService.updateContact(this.contactId,this.contact).subscribe(updatedContact=>{
      this.contact = updatedContact;
      this.isSuccessful = true;
      this.router.navigate(['contact-list']);
    },err=>{
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
      return false;
    });
  }


  onSubmit() {
    this.authService.contactRegister(this.contact).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['contact-list']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
