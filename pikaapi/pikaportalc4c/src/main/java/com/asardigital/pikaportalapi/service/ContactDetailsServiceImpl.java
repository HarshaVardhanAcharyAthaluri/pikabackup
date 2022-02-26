package com.asardigital.pikaportalapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.asardigital.pikaportalapi.model.Contact;
import com.asardigital.pikaportalapi.repository.ContactRepository;

@Service()
public class ContactDetailsServiceImpl implements UserDetailsService{

	@Autowired
	ContactRepository contactRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Contact contact = contactRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Contact Not Found with username: " + email));
		return ContactDetailsImpl.build(contact);
	}
}
