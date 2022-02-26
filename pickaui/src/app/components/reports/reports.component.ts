import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { C4ccustomerdetailsService } from 'src/app/services/c4ccustomerdetails.service';
import { ContactService } from 'src/app/services/contact.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  isLoggedIn;
  showspinner:boolean = false;
  reportsList:Array<any>;
  error:string;
  contact:Contact = new Contact();
  reportsColumns: string[] = ['Account', 'TicketNumber', 'Date Time Opened', 'Ticket Assaigned to/Consultant','Reported By','Date Time Close','Case Record Type','Case Type','Related Module','Status','Severity','Contract ID','Subject','Complexity'];


  constructor(
    private c4ccustomerservice:C4ccustomerdetailsService,
    private tokenStorage: TokenStorageService,
    private contactservice:ContactService
  ) { }

  ngOnInit(){

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.contactservice.getContactById(this.tokenStorage.getUser().id).subscribe(contactdetails =>{
        this.contact = contactdetails;
        this.getReports(this.contact.refCustomeId.customerId);
      });
    }
  }

  getReports(buyerPartyId){
    this.showspinner = true;
    this.c4ccustomerservice.getAllServiceContracts(buyerPartyId).subscribe(reports=>{
      this.reportsList = reports.d.results;
      if(reports.d.results[0] === undefined){
            this.error = 'BuyerId not found';
      }
        this.showspinner = false;
    },err=>{
      this.showspinner = false;
    });

  }
}
