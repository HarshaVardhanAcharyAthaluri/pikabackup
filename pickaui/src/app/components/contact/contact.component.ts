import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactList: Array<any>;
  erromsg='';
  successmsg='';

  constructor(private contactService:ContactService,private tokenStorage:TokenStorageService) {

   }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
     this.contactService.getAllContacts().subscribe(contacts=>{
      this.contactList = contacts;
      },err=>{

     });
    }
  }

  deleteContact(contactId){
    this.contactService.deleteContact(contactId).subscribe(cont=>{
        this.contactService.getAllContacts().subscribe(updateContList=>{
          this.contactList = updateContList;
         
        });
        this.successmsg = cont;
    },err=>{
        this.erromsg = err.error.error;
    });
}

}
