import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/c4c/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class C4ccustomerdetailsService {

  constructor(private http:HttpClient) { }

  getc4cCustomerDetails(accountId:string):Observable<any>{
    return this.http.get(API_URL + 'customer/'+accountId,httpOptions);
  }

  getAllc4cCustomerDetails(accountId:string):Observable<any>{
    return this.http.get(API_URL+'allcustomers/'+accountId,httpOptions);
  }
   
  getAllServiceContracts(buyerPartyId:string):Observable<any>{
    return this.http.get(API_URL+'allservicecontracts/'+buyerPartyId,httpOptions);
  }

  getModulesInScope(contractId:string):Observable<any>{
    return this.http.get(API_URL+'modulesinscope/'+contractId,httpOptions);
  }

  getContractHoursSummary(contractId:string):Observable<any>{
    return this.http.get(API_URL+'contracthourssummary/'+contractId,httpOptions);
  }

  getHoursUtilizedDetails(contractId:string):Observable<any>{
    return this.http.get(API_URL+'hoursutilizeddetails/'+contractId,httpOptions);
  }

  getReports(buyerPartyId:string):Observable<any>{
    return this.http.get(API_URL+'reports/'+buyerPartyId,httpOptions);
  }

  getServiceRequests(buyerPartyId:string):Observable<any>{
    return this.http.get(API_URL+'servicerequests/'+buyerPartyId,httpOptions);
  }

  getServiceRequestInteractions(serviceRequestId:string):Observable<any>{
    return this.http.get(API_URL+'interactions/'+serviceRequestId,httpOptions);
  }

}
