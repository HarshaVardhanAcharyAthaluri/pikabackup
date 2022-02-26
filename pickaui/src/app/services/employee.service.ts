import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


const API_URL = 'http://localhost:8080/employee/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {



  constructor(private http: HttpClient) { 
      
  }

  getAllEmployees(): Observable<any> {
    return this.http.get(API_URL + 'all');
  }

  getEmployeeById(employeeId:number):Observable<any>{
      return this.http.get(API_URL+employeeId);
  }

  updateEMployee(employeeId:number,employee:any):Observable<any>{
    return this.http.put(API_URL+employeeId,{
      name: employee.name,
      email: employee.email,
      password: employee.password,
      refCustomeId:employee.refCustomeId
    }, httpOptions);

  }

  
  deleteEmployee(employeeId:number):Observable<any>{
    return this.http.delete(API_URL+employeeId, { responseType: 'text' });
  }

  
}
