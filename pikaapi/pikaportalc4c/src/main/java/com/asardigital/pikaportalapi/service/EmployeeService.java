package com.asardigital.pikaportalapi.service;

import java.util.List;

import com.asardigital.pikaportalapi.model.Employee;

public interface EmployeeService {

	public Employee updateEmployee(Long empid,Employee employee);
	public String deleteEmployee(Long empId);
	public List<Employee> getAllEmployees(); 
	public Employee getEmployeeById(Long empId);
	
}
