import { Component, OnInit } from "@angular/core";
import { c4cCustomerDetails } from "src/app/models/c4cCustomerDetails";
import { Contact } from "src/app/models/contact";
import { C4ccustomerdetailsService } from "src/app/services/c4ccustomerdetails.service";
import { ContactService } from "src/app/services/contact.service";
import { TokenStorageService } from "src/app/services/token-storage.service";


@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {
  isLoggedIn;
  contactList: Array<any>;
  contact: Contact = new Contact();
  showspinner: boolean = false;
  contactspineer: boolean = false;
  error: string;

  cars = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'}
  ];

  constructor(
    private contactService: ContactService,
    private tokenStorage: TokenStorageService,
    private c4ccustomerservice: C4ccustomerdetailsService
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.contactService.getAllContacts().subscribe((contact) => {
        this.contactList = contact;
        this.contactList.forEach((x) => {
          if (x.name === this.tokenStorage.getUser().name) {
            this.contact = x;
          }
        });
      });
    }
  }
}
