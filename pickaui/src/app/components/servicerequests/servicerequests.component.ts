import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { C4ccustomerdetailsService } from 'src/app/services/c4ccustomerdetails.service';
import { ContactService } from 'src/app/services/contact.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-servicerequests',
  templateUrl: './servicerequests.component.html',
  styleUrls: ['./servicerequests.component.scss']
})
export class ServicerequestsComponent implements OnInit {

  isLoggedIn;
  showspinner:boolean = false;
  serviceRequestsList:Array<any>;
  error:string;
  contact:Contact = new Contact();
  serviceRequestsColumns: string[] = ['Ticket Number','Subject','Reported on Date/Time','Severity','Reported By','Status','Case Owner','Module','Case Record Type','Ticket Closed Date/Time'];


  constructor( private c4ccustomerservice:C4ccustomerdetailsService,
    private tokenStorage: TokenStorageService,
    private contactservice:ContactService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.contactservice.getContactById(this.tokenStorage.getUser().id).subscribe(contactdetails =>{
        this.contact = contactdetails;
        this.getServiceRequests(this.contact.refCustomeId.customerId);
      });
    }
  }

  getServiceRequests(buyerPartyId){
    this.showspinner = true;
    this.c4ccustomerservice.getServiceRequests(buyerPartyId).subscribe(reports=>{
      this.serviceRequestsList = reports.d.results;
      if(reports.d.results[0] === undefined){
            this.error = 'BuyerId not found';
      }
        this.showspinner = false;
    },err=>{
      this.showspinner = false;
    });

  }

  rowClicked(element) {
    this.router.navigate(['/servicerequestdetails', element.ID,
    {
      subject: element.Name,
      status: element.ServiceRequestUserLifeCycleStatusCodeText,
      reportedondatetime: element.CreationDateTime,
      tiketcloseddatetime: element.CompleteDuedatetimeContent,
      reportedby: element.ReportedPartyName,
      caseowner: element.ServicePerformerPartyName,
      severity: element.ServicePriorityCodeText,
      module: element.ProductDescription,
      caserecordtype: element.CaseRecordType_KUT
    }]);
  }

}
