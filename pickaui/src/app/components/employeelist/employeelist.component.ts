import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {

  erromsg='';
  successmsg='';
  empList: Array<any>;

  constructor(private employeeService:EmployeeService,private tokenStorage:TokenStorageService) {

   }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
     this.employeeService.getAllEmployees().subscribe(employees=>{
      this.empList = employees;
      },err=>{

     });
    }
  }

  deleteemployee(empId){
      this.employeeService.deleteEmployee(empId).subscribe(emp=>{
          this.employeeService.getAllEmployees().subscribe(updateEmpList=>{
            this.empList = updateEmpList;
           
          });
          this.successmsg = emp;
      },err=>{
          this.erromsg = err.error.error;
      });
  }

}
