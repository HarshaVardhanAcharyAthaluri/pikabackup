import { Component, OnInit } from '@angular/core';

import {User} from '../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  returnUrl:string;
  loggedRole:string = 'Contact';
  showspinner:boolean = false;
  contact:Contact = new Contact();
  contactList:Array<any>;

  constructor(
     private authService: AuthService,
     private tokenStorage: TokenStorageService,
     private router:Router,
     private activatedRoute: ActivatedRoute,
     private contactService:ContactService
     ) {

   }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    if(this.returnUrl.includes('admin')){
      this.loggedRole = 'Employee';
    }
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      if(this.roles.includes('ROLE_USER')){
        this.router.navigate(['welcome']);
      }else{
        this.router.navigate(['employeetiles']);
      }
      return;
    }
    
  }

  login() {
    this.showspinner = true;
    if(this.returnUrl === '/admin'){
      this.authService.adminlogin(this.user).subscribe(
        data => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.showspinner = false;
          this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['admin']);
          window.location.reload();
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          this.showspinner = false;
        }
      );
    }else{
    this.authService.login(this.user).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.showspinner = false;
        this.roles = this.tokenStorage.getUser().roles;
        this.contactService.getAllContacts().subscribe(contact=>{
          this.contactList = contact;
          this.contactList.forEach(x=>{
            if(x.name === this.tokenStorage.getUser().name){
               this.contact = x;
               this.router.navigate(['/update-customer',this.contact.refCustomeId.customerId]);
            }
          });
        });
        window.location.reload();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.showspinner = false;
      }
    );
  }
  }

}
