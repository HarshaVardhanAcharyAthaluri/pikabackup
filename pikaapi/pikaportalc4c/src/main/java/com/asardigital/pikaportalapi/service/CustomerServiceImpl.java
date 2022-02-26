package com.asardigital.pikaportalapi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asardigital.pikaportalapi.model.Customer;
import com.asardigital.pikaportalapi.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService{

	@Autowired
	CustomerRepository customerRepository;
	
	@Override
	public Customer updateCustomer(Long customerId, Customer customer) {
		Optional<Customer> cust = customerRepository.findById(customerId);
		Customer existingCustomer = null;
		if(cust.isPresent()) {
			existingCustomer = cust.get();
			if(customer.getName()!=null)
				existingCustomer.setName(customer.getName());
			if(customer.getDescription()!=null)
				existingCustomer.setDescription(customer.getDescription());
		}
		 customerRepository.save(existingCustomer);
		 return existingCustomer;
	}

	@Override
	public String deleteCustomer(Long customerId) {
		Customer customer = customerRepository.findById(customerId).orElse(null);
		if(customer==null) {
				return "Customer Not Found with "+ customerId; 
		}
		String customerName = customer.getName();
		customerRepository.deleteById(customerId);
		return customerName+ " removed Successfully";
	}

	@Override
	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}

	@Override
	public Customer getCustomertById(Long customerId) {
		return customerRepository.findById(customerId).orElse(null);
	}

	@Override
	public Customer createCustomer(Customer customer) {
		return customerRepository.save(customer);
	}


}
