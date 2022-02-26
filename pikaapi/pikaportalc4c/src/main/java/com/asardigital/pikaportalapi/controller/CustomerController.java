package com.asardigital.pikaportalapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.asardigital.pikaportalapi.model.Customer;
import com.asardigital.pikaportalapi.service.CustomerService;


@RestController
public class CustomerController {
	
	@Autowired
	CustomerService customerService;
	

	@GetMapping("/customer/all")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<List<Customer>> getAllCustomers(){
		return new ResponseEntity<List<Customer>>(customerService.getAllCustomers(),HttpStatus.OK);
	}
	
	@GetMapping("/customer/{customerId}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<Customer> getCustomerById(@PathVariable Long customerId){
		return new ResponseEntity<Customer>(customerService.getCustomertById(customerId),HttpStatus.OK);
	}
	
	@PostMapping("/customer")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer){
		return new ResponseEntity<Customer>(customerService.createCustomer(customer),HttpStatus.OK);
	}
	
	@PutMapping("/customer/{customerId}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<Customer> updateCustomer(@PathVariable("customerId") Long customerId,@RequestBody Customer customer){
		Customer existCustomer = customerService.updateCustomer(customerId, customer);
		return new ResponseEntity<Customer>(existCustomer,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/customer/{customerId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<String> deleteCustomer(@PathVariable("customerId") Long customerId){
		return new ResponseEntity<String>(customerService.deleteCustomer(customerId),HttpStatus.OK);
	}
}
