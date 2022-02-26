package com.asardigital.pikaportalapi.service;

import java.util.List;

import com.asardigital.pikaportalapi.model.Customer;


public interface CustomerService {
	
	public Customer updateCustomer(Long customerId,Customer customer);
	public String deleteCustomer(Long customerId);
	public List<Customer> getAllCustomers(); 
	public Customer getCustomertById(Long customerId);
	public Customer createCustomer(Customer customer);

}
