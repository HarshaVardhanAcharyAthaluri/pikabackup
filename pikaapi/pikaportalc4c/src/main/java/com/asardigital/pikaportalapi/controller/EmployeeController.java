package com.asardigital.pikaportalapi.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.asardigital.pikaportalapi.model.Employee;
import com.asardigital.pikaportalapi.service.EmployeeService;

@RestController
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;
	
	
	@GetMapping("/employee/all")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<Employee>> getAllEmployee(){
		return new ResponseEntity<List<Employee>>(employeeService.getAllEmployees(),HttpStatus.OK);
	}
	
	@GetMapping("/employee/{empid}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long empid){
		return new ResponseEntity<Employee>(employeeService.getEmployeeById(empid),HttpStatus.OK);
	}
	
	@PutMapping("/employee/{empid}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Employee> updateEmployee(@PathVariable("empid") Long empid,@RequestBody Employee employee){
		Employee existinemp = employeeService.updateEmployee(empid, employee);
		return new ResponseEntity<Employee>(existinemp,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/employee/{empid}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<String> deleteEmployee(@PathVariable("empid") Long empid){
		return new ResponseEntity<String>(employeeService.deleteEmployee(empid),HttpStatus.OK);
	}
}
