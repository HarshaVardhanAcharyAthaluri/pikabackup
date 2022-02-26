import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceRequestDetails } from 'src/app/models/servicerequestdetails';
import { C4ccustomerdetailsService } from 'src/app/services/c4ccustomerdetails.service';

@Component({
  selector: 'app-servicerequestdetails',
  templateUrl: './servicerequestdetails.component.html',
  styleUrls: ['./servicerequestdetails.component.scss']
})
export class ServicerequestdetailsComponent implements OnInit {

  
  isLoggedIn;
  showspinner:boolean = false;
  interactionsList:Array<any>;
  error:string;
  servicerequestid:string;
  serviceRequestDetails:ServiceRequestDetails = new ServiceRequestDetails();
  interactionsColumns=[];

  constructor(
    private c4ccustomerservice:C4ccustomerdetailsService,
    private route:ActivatedRoute
    ) { }

  ngOnInit() {
    this.showspinner = true;
    this.route.paramMap.subscribe(params => {
      if(params.has('servicerequestid')){
        this.servicerequestid = params.get('servicerequestid');

        if(params.has('subject')){
          this.serviceRequestDetails.details = {
            subject:params.get('subject'),
            status:params.get('status'),
            reportedondatetime:params.get('reportedondatetime'),
            tiketcloseddatetime:params.get('tiketcloseddatetime'),
            reportedby:params.get('reportedby'),
            caseowner:params.get('caseowner'),
            severity:params.get('severity'),
            module:params.get('module'),
            caserecordtype:params.get('caserecordtype')
        };
        }
        this.getServiceInteractions(this.servicerequestid);
      }
    })
  }

  getServiceInteractions(servicerequestid){
    this.c4ccustomerservice.getServiceRequestInteractions(servicerequestid).subscribe(interactions=>{
      this.showspinner = true;
     this.interactionsList = interactions.d.results;
     if(interactions.d.results[0] === undefined){
           this.error = 'CustomerId not found';
     }
       this.showspinner = false;
   },err=>{
     this.showspinner = false;
   });
}



}
