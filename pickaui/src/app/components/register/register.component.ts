import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  employee:Employee = new Employee();


  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  buttontext='Create Employee';
  empId;

  constructor(private authService: AuthService,private employeeService:EmployeeService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.empId = params.get('id');
        this.getEmployee(this.empId);
      }
    });
  }


  getEmployee(employeeId){
    this.buttontext = 'Update Employee'
    this.employeeService.getEmployeeById(employeeId).subscribe(employee=>{
      this.employee = employee;
    },err=>{
      this.errorMessage = err.error.message;
    });    
    return this.employee;
  }

  updateEmployee(){
    this.employeeService.updateEMployee(this.employee.id,this.employee).subscribe(updatedEmployee=>{
      this.employee = updatedEmployee;
      this.isSuccessful = true;
      this.router.navigate(['admin']);
    },err=>{
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
    });
  }


  onSubmit() {
    this.authService.register(this.employee).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['admin']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
