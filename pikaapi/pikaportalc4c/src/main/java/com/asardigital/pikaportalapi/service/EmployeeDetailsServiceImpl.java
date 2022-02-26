package com.asardigital.pikaportalapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asardigital.pikaportalapi.model.Contact;
import com.asardigital.pikaportalapi.model.Employee;
import com.asardigital.pikaportalapi.repository.ContactRepository;
import com.asardigital.pikaportalapi.repository.EmployeeRepository;

@Service()
public class EmployeeDetailsServiceImpl implements UserDetailsService {

	@Autowired
	EmployeeRepository employeeRepository;
	
	@Autowired
	ContactRepository contactRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String email){
		try {
			Employee employee = employeeRepository.findByEmail(email)
					.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + email));
			return EmployeeDetailsImpl.build(employee);
		}catch(UsernameNotFoundException ex) {
				
		}
		
		Contact contact =  contactRepository.findByEmail(email)
			.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + email));

		return ContactDetailsImpl.build(contact);
	}

}
