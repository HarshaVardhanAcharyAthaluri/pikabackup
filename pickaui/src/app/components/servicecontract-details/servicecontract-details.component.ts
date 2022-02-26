import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceContractDetails } from 'src/app/models/servicecontractdetails';
import { C4ccustomerdetailsService } from 'src/app/services/c4ccustomerdetails.service';

@Component({
  selector: 'app-servicecontract-details',
  templateUrl: './servicecontract-details.component.html',
  styleUrls: ['./servicecontract-details.component.scss']
})
export class ServicecontractDetailsComponent implements OnInit {
  servicecontractDetails:ServiceContractDetails = new ServiceContractDetails();
  error:string;
  showspinner:boolean=false;
  serviceContractId:string;
  modulesInscopeColumns: string[] = ['Line', 'Status', 'Product Name', 'Product Description','Module Quantity','Unit'];
  contractHoursSummary: string[] = ['Line', 'Status', 'Product Name', 'Product Description','Contract Hours Purchased','Unit','Total Hours Worked','TotalPeriodReleaseQuantityUnitCode','Total Remaining Hours','TotalPeriodOpenQuantityUnitCode'];
  hoursUtilizedDetails: string[] = ['ID', 'Subject', 'Type', 'Status','Reported On','Hours Utilized','Consultant'];
  modluesInscopeList:Array<any>;
  contractHoursSummaryList:Array<any>;
  hoursUtilizedDetailsList:Array<any>;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private c4customerservice:C4ccustomerdetailsService
    ) { }

  ngOnInit(): void {
    this.showspinner = true;
    this.route.paramMap.subscribe(params => {
      if(params.has('contractid')){
        this.serviceContractId = params.get('contractid');
        this.getModulesInscope(this.serviceContractId);
        this.getContractHoursSummary(this.serviceContractId);
        this.getHoursUtilizedDetails(this.serviceContractId);
      }
      if(params.has('contractRecordtype')){
        this.servicecontractDetails.details = {
          contractRecordtype:params.get('contractRecordtype'),
          contractstartdate:params.get('contractstartdate'),
          contractenddate:params.get('contractenddate'),
          contractexpirationdate:params.get('contractexpirationdate'),
          status:params.get('status'),
          totalcontractvalue:params.get('totalcontractvalue'),
          currencycode:params.get('currencycode')
      };
      }
    });
  }

  getModulesInscope(contractID){
       this.c4customerservice.getModulesInScope(contractID).subscribe(modulesinscope=>{
         this.showspinner = true;
        this.modluesInscopeList = modulesinscope.d.results;
        if(modulesinscope.d.results[0] === undefined){
              this.error = 'CustomerId not found';
        }
          this.showspinner = false;
      },err=>{
        this.showspinner = false;
      });
  }

  getContractHoursSummary(contractID){
    this.c4customerservice.getContractHoursSummary(contractID).subscribe(contractHoursSummary=>{
      this.showspinner = true;
     this.contractHoursSummaryList = contractHoursSummary.d.results;
     if(contractHoursSummary.d.results[0] === undefined){
           this.error = 'CustomerId not found';
     }
       this.showspinner = false;
   },err=>{
     this.showspinner = false;
   });
  }

  getHoursUtilizedDetails(contractID){
    this.c4customerservice.getHoursUtilizedDetails(contractID).subscribe(hoursUtilized=>{
      this.showspinner = true;
     this.hoursUtilizedDetailsList = hoursUtilized.d.results;
     if(hoursUtilized.d.results[0] === undefined){
           this.error = 'CustomerId not found';
     }
       this.showspinner = false;
   },err=>{
     this.showspinner = false;
   });
}
}
