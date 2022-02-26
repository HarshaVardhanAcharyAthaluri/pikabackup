package com.asardigital.pikaportalapi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asardigital.pikaportalapi.model.Employee;
import com.asardigital.pikaportalapi.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService{

	@Autowired
	EmployeeRepository employeeRepository;
	
	@Override
	public String deleteEmployee(Long empId) {
		Employee employee = employeeRepository.findById(empId).orElse(null);
		if(employee==null) {
				return "USER Not Found with "+ empId; 
		}
		String empName = employee.getName();
		employeeRepository.deleteById(empId);
		return empName+ " removed Successfully";
	}

	@Override
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}

	@Override
	public Employee getEmployeeById(Long empid) {
		return employeeRepository.findById(empid).orElse(null);
	}

	@Override
	public Employee updateEmployee(Long empid, Employee employee) {
		Optional<Employee> emp = employeeRepository.findById(empid);
		Employee existingEmp = null;
		if(emp.isPresent()) {
			existingEmp = emp.get();
			if(employee.getName()!=null)
			existingEmp.setName(employee.getName());
			if(employee.getEmail()!=null)
			existingEmp.setEmail(employee.getEmail());
			if(employee.getCompanyName()!=null)
			existingEmp.setCompanyName(employee.getCompanyName());
		}
		 employeeRepository.save(existingEmp);
		 return existingEmp;
	}
	
}
